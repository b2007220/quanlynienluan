const { PrismaClient, Role } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
	await prisma.user.create({
		data: {
			email: '',
			password: hash('admin', 10),
			role: Role.ADMIN,
		},
	});
}

main;
