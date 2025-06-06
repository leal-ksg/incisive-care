import { DataTypes } from 'sequelize';
import { sequelize } from '..';

export const AppointmentService = sequelize.define(
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
    unitAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
