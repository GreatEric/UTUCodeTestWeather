import { Service, Inject } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { IUserInputDTO } from "../interfaces/IUser";
import { EventDispatcher, EventDispatcherInterface } from "../decorators/eventDispatcher";
import events from '../subscribers/events';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: ModelCtor,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async SignUp(user: IUserInputDTO): Promise<any> {
    try {
      (async () => {
        const u = await this.userModel.create(user);
        if (!u) {
          throw new Error('User cannot be created');
        }
        this.eventDispatcher.dispatch(events.user.signUp, { user: u });
      })();
    }catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
