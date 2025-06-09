import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { appointmentServicesController } from '../controllers/appointment-services-controller';

const router = Router();

router.get('/:appointmentId', auth, appointmentServicesController.findAll);
router.post('/', auth, appointmentServicesController.create);
router.put('/', auth, appointmentServicesController.update);
router.delete('/:appointmentId', auth, appointmentServicesController.delete);

export default router;
