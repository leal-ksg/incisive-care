import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { userController } from '../controllers/user-controller';
import { createUserSchema } from '../../../common/validation/user/create-user-schema';

const router = Router();

router.get('/', auth, userController.findAll);
router.get('/:id', auth, userController.findOne);
router.post('/login', userController.login);
router.post(
  '/',
  (req, res, next) => validateSchema(req, res, next, createUserSchema),
  userController.create
);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.delete);

export default router