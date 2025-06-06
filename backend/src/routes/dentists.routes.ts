import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { dentistController } from '../controllers/dentist-controller';
import { createDentistSchema } from '../../../common/validation/dentist/create-dentist-schema';

const router = Router();

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

export default router