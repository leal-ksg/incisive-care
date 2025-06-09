import { Router } from 'express';
import usersRoutes from './users.routes';
import appointmentsRoutes from './appointments.routes';
import dentistsRoutes from './dentists.routes';
import patientsRoutes from './patients.routes';
import servicesRoutes from './services.routes';
import appointmentServicesRoutes from './appointment-services.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/services', servicesRoutes);
router.use('/dentists', dentistsRoutes);
router.use('/patients', patientsRoutes);
router.use('/users', usersRoutes);
router.use('/appointment-services', appointmentServicesRoutes);

export default router;
