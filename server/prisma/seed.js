const { PrismaClient, Role } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await hash('admin', 10);
	await prisma.user.create({
		data: {
			email: 'admin@gmail.com',
			password: hashedPassword,
			role: Role.ADMIN,
			uid: hashedPassword,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
