import { sequelize } from '..';
import { defineServiceModel } from './services';
import { defineAppointmentServiceModel } from './appointment-services';

export const Service = defineServiceModel(sequelize);
export const AppointmentService = defineAppointmentServiceModel(sequelize);

Service.hasMany(AppointmentService, { foreignKey: 'serviceId' });
AppointmentService.belongsTo(Service, { foreignKey: 'serviceId' });
