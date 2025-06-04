import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('Users', 'createdAt', DataTypes.DATE);
  await queryInterface.addColumn('Users', 'updatedAt', DataTypes.DATE);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('Users', 'createdAt');
  await queryInterface.removeColumn('Users', 'updatedAt');
}
