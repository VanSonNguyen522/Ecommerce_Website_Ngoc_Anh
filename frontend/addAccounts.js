const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 50 }, async (_, index) => {
    const password = 'yourPassword123'; // Set a plain password here
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password

    return {
      email: `user${index + 1}@example.com`, // Unique email for each user
      hashedPassword: hashedPassword, // Use the hashed password
      name: `User ${index + 1}`, // Name for each user
      role: 'user', // Role for each user
    };
  });

  // Wait for all users to be created
  const userData = await Promise.all(users);
  
  await prisma.user.createMany({
    data: userData,
  });

  console.log('50 users created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
