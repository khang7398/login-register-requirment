import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let refreshTokens: any = [];

const authController = {
  //Register
  registerUer: async (req: express.Request, res: express.Response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      // create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //save to DB
      const userSave = await newUser.save();
      res.status(200).json(userSave);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user: any) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.TOKEN_SECRET || 'tokentest',
      { expiresIn: '30s' }
    );
  },

  generateRefreshToken: (user: any) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.REFRESH_SECRET || 'tokentest',
      { expiresIn: '365d' }
    );
  },

  loginUser: async (req: express.Request, res: express.Response) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json('Wrong username');
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json('Wrong password');
      }

      if (user && validPassword) {
        const accessToken: string = authController.generateAccessToken(user);
        const refreshToken: string = authController.generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
      console.log(req.body);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req: express.Request | any, res: express.Response) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    res.status(200).json(refreshToken);
  },
};

export default authController;
