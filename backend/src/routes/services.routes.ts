import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { serviceController } from '../controllers/service-controller';
import { createServiceSchema } from '../../../common/validation/service/create-service-schema';

const router = Router();

router.get('/', auth, serviceController.findAll);
router.get('/:id', auth, serviceController.findOne);
router.post(
  '/',
  auth,
  (req, res, next) => validateSchema(req, res, next, createServiceSchema),
  serviceController.create
);
router.put('/:id', auth, serviceController.update);
router.delete('/:id', auth, serviceController.delete);

export default router;
