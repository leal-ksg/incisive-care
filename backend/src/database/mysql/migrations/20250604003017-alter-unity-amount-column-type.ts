import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn('Services', 'unitAmount', {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn('Services', 'unitAmount', {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
  });
}
