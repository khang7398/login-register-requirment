import express from 'express';
import User from '../models/user';

const userController = {
  //Get all user

  getAllUsers: async (req: express.Request, res: express.Response) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUsers: async (req: express.Request, res: express.Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
