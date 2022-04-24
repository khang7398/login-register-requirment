import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const middlewareController = {
  verifyToken: (req: express.Request | any, res: express.Response, next: express.NextFunction) => {
    const token: any = req.headers.token;

    if (token) {
      const accessToken = token.split(' ');
      const tokenVertify = accessToken[1];
      jwt.verify(tokenVertify, process.env.JWT_ACCESS_KEY || '', function (err: any, user: any) {
        if (err) {
          return res.status(403).json('Token is not valid');
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
};

export default middlewareController;
