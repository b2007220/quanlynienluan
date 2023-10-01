const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const admin = await prisma.user.create({
		data: {
			email: '',
			password: '',
			role: 'ADMIN',
		},
	});
}

main;
