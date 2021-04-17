import {Router, Request, Response, NextFunction} from 'express';
import { Container } from "typedi";
import { Logger } from "winston";
import UserService from "../../services/user";
import {IUserInputDTO} from "../../interfaces/IUser";

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get('logger');
  app.use('/user', route);

  route.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        let user = req.body as IUserInputDTO;
        await userService.SignUp(user);
        return res.status(201).json(user);
      } catch (e) {
        logger.error('🔥 signup error: %o', e);
        return next(e);
      }
    },
  );
};
