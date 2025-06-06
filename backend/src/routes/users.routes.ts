import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validate-schema';
import { userController } from '../controllers/user-controller';
import { createUserSchema } from '../../../common/validation/user/create-user-schema';

const router = Router();

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

export default router