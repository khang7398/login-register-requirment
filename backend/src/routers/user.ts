import express from 'express';
import middlewareController from '../controllers/middlewareController';
import userController from '../controllers/user';

const router = express.Router();

// get all user
router.get('/', userController.getAllUsers);

// delete user
router.delete('/:id', userController.deleteUsers);

export default router;
