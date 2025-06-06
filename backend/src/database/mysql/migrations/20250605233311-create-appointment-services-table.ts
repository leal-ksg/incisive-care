import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('AppointmentServices', {
    appointmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('AppointmentServices');
}
