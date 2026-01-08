# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies including dev (for building)
RUN npm install

COPY src ./src
COPY public ./public

# Build TypeScript
RUN npm run build
# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Production Run
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user for security (Bank Requirement)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Fix permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 10000

CMD ["npm", "start"]
