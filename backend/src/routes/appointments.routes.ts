import { Router } from 'express';
import { appointmentController } from '../controllers/appointment-controller';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { createAppointmentSchema } from '../../../common/validation/appointment/create-appointment-schema';

const router = Router();

router.get('/', auth, appointmentController.findAll);
router.get('/count', auth, appointmentController.getAppointmentsCount);
router.get('/:id', auth, appointmentController.findOne);
router.post(
  '/',
  auth,
  (req, res, next) => validateSchema(req, res, next, createAppointmentSchema),
  appointmentController.create
);
router.put('/:id', auth, appointmentController.update);
router.delete('/:id', auth, appointmentController.delete);

export default router;
