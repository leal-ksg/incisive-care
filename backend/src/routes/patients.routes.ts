import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { patientController } from '../controllers/patient-controller';
import { createPatientSchema } from '../../../common/validation/patient/create-patient-schema';

const router = Router();

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

export default router