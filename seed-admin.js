const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@risk.co';
    const password = 'admin123';

    console.log(`🌱 Seeding Admin User: ${email}`);

    // 1. Create Organization
    const org = await prisma.organization.upsert({
        where: { name: 'HQ Bank' },
        update: {},
        create: {
            name: 'HQ Bank',
            type: 'BANK',
            apiKey: 'pk_live_admin_key'
        }
    });

    // 2. Create User
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
            orgId: org.id
        }
    });

    console.log(`✅ User Created!`);
    console.log(`   Email: ${email}`);
    console.log(`   Pass:  ${password}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
