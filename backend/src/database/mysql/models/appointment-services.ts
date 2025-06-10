import { DataTypes, Sequelize } from 'sequelize';

export const defineAppointmentServiceModel = (sequelize: Sequelize) => {
  return sequelize.define(
    'AppointmentServices',
    {
      appointmentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
