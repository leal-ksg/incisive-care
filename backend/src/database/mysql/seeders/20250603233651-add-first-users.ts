import { QueryInterface } from 'sequelize';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

export async function up(queryInterface: QueryInterface) {
  const users = [
    {
      name: 'Administrador',
      email: 'admin@gmail.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Usuário teste',
      email: 'usuario@gmail.com',
      password: await bcrypt.hash(process.env.TEST_USER_PASSWORD!, 10),
      role: 'dentist',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert('Users', users);
}
