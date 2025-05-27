import { Router } from 'express';
import { appointmentController } from './controllers/appointment-controller';
import { serviceController } from './controllers/service-controller';
import { validateSchema } from './middlewares/validate-schema';
import { createServiceSchema } from '../../common/validation/service/create-service-schema';
import { createAppointmentSchema } from '../../common/validation/appointment/create-appointment-schema';
import { createDentistSchema } from '../../common/validation/dentist/create-dentist-schema';
import { dentistController } from './controllers/dentist-controller';
import { createPatientSchema } from '../../common/validation/patient/create-patient-schema';
import { patientController } from './controllers/patient-controller';
import { userController } from './controllers/user-controller';
import { createUserSchema } from '../../common/validation/user/create-user-schema';
import { auth } from './middlewares/auth';

const router = Router();

// APPOINTMENTS
router.get('/appointments', auth, appointmentController.findAll);
router.get(
  '/appointments/count',
  auth,
  appointmentController.getAppointmentsCount
);
router.get('/appointments/:id', auth, appointmentController.findOne);
router.post(
  '/appointments',
  auth,
  (req, res, next) => validateSchema(req, res, next, createAppointmentSchema),
  appointmentController.create
);
router.put('/appointments/:id', auth, appointmentController.update);
router.delete('/appointments/:id', auth, appointmentController.delete);

// SERVICES
router.get('/services', auth, serviceController.findAll);
router.get('/services/:id', auth, serviceController.findOne);
router.post(
  '/services',
  auth,
  (req, res, next) => validateSchema(req, res, next, createServiceSchema),
  serviceController.create
);
router.put('/services/:id', auth, serviceController.update);
router.delete('/services/:id', auth, serviceController.delete);

// DENTISTS
router.get('/dentists', auth, dentistController.findAll);
router.get('/dentists/:id', auth, dentistController.findOne);
router.post(
  '/dentists',
  auth,
  (req, res, next) => validateSchema(req, res, next, createDentistSchema),
  dentistController.create
);
router.put('/dentists/:id', auth, dentistController.update);
router.delete('/dentists/:id', auth, dentistController.delete);

// PATIENTS
router.get('/patients', auth, patientController.findAll);
router.get('/patients/:idType/:id', auth, patientController.findOne);
router.post(
  '/patients',
  auth,
  (req, res, next) => validateSchema(req, res, next, createPatientSchema),
  patientController.create
);
router.put('/patients/:id', auth, patientController.update);
router.delete('/patients/:id', auth, patientController.delete);

// USERS
router.get('/users', auth, userController.findAll);
router.get('/users/:id', auth, userController.findOne);
router.post('/users/login', userController.login);
router.post(
  '/users',
  (req, res, next) => validateSchema(req, res, next, createUserSchema),
  userController.create
);
router.put('/users/:id', auth, userController.update);
router.delete('/users/:id', auth, userController.delete);

export default router;
