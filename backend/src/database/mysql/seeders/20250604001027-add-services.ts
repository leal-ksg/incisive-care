import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  const services = [
    {
      description: 'Aparelho ortodôntico',
      category: 'Estética',
      duration: 60,
      unitAmount: 115.5,
    },
    {
      description: 'Clareamento',
      category: 'Estética',
      duration: 45,
      unitAmount: 720,
    },
    {
      description: 'Extração de ciso',
      category: 'Cirurgia',
      duration: 90,
      unitAmount: 500,
    },
    {
      description: 'Tratamento de canal',
      category: 'Cirurgia',
      duration: 60,
      unitAmount: 243.99,
    },
  ];

  await queryInterface.bulkInsert('Services', services);
}
