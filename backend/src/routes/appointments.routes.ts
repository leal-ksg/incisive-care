import { Router } from 'express';
import { appointmentController } from '../controllers/appointment-controller';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { createAppointmentSchema } from '../../../common/validation/appointment/create-appointment-schema';

const router = Router();

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

export default router;
