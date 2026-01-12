const { PrismaClient } = require('@prisma/client');

console.log('🔍 Diagnostic: Starting DB Connection Check...');

// 1. Check Env Vars presence
const dbUrl = process.env.DATABASE_URL;
const dirUrl = process.env.DIRECT_URL;

console.log('ENV: DATABASE_URL is ' + (dbUrl ? 'SET ✅' : 'MISSING ❌'));
console.log('ENV: DIRECT_URL is ' + (dirUrl ? 'SET ✅' : 'MISSING ❌'));

if (dbUrl) {
    console.log('ENV: DATABASE_URL starts with: ' + dbUrl.substring(0, 15) + '...');
}
if (dirUrl) {
    console.log('ENV: DIRECT_URL starts with: ' + dirUrl.substring(0, 15) + '...');
}

// 2. Attempt Connection
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('⚡ Attempting Prisma Connect...');
        await prisma.$connect();
        console.log('✅ Success! Prisma connected.');
        await prisma.$disconnect();
        process.exit(0);
    } catch (e) {
        console.error('❌ Connection Failed!');
        console.error(e);
        process.exit(1);
    }
}

main();
