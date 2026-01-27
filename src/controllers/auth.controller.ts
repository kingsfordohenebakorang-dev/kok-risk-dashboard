import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../data/db';
import { logger } from '../utils/logger';
import { config } from '../config/env';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['USER', 'ADMIN']).optional(),
    organizationName: z.string().min(2),
    organizationType: z.enum(['BANK', 'FINTECH']),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const register = async (req: Request, res: Response) => {
    try {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json(validation.error.format());
        }

        const { email, password, role, organizationName, organizationType } = validation.data;

        // Check existing user
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create or Connect Organization
        // For simplicity: We create a new org if name is unique, or fail if name is taken (to prevent spoofing)
        let org = await prisma.organization.findUnique({ where: { name: organizationName } });

        if (org) {
            return res.status(409).json({ error: 'Organization already registered. Contact admin to join.' });
        }

        // Atomic Transaction: Create Org + Admin User
        const result = await prisma.$transaction(async (tx) => {
            const newOrg = await tx.organization.create({
                data: {
                    name: organizationName,
                    type: organizationType
                }
            });

            const newUser = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: role || 'ADMIN', // First user is Admin of Org
                    orgId: newOrg.id
                },
            });

            return { user: newUser, org: newOrg };
        });

        logger.info(`New Organization registered: ${organizationName} (${organizationType}) by ${email}`);

        return res.status(201).json({
            id: result.user.id,
            email: result.user.email,
            org: { name: result.org.name, type: result.org.type }
        });
    } catch (error) {
        logger.error('Register error', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) return res.status(400).json(validation.error.format());

        const { email, password } = validation.data;

        const user = await prisma.user.findUnique({
            where: { email },
            include: { org: true }
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify Password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign(
            { userId: user.id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                org: user.org ? { name: user.org.name, type: user.org.type } : null
            }
        });
    } catch (error) {
        logger.error('Login error', error);
        return res.status(500).json({ error: 'Login failed' });
    }
};
