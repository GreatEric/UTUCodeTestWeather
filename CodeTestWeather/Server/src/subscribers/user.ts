import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces/IUser';
import { Logger } from 'winston';

@EventSubscriber()
export default class UserSubscriber {

  @On(events.user.signUp)
  public onUserSignUp({ id, device_uuid,curr_city_id }: Partial<IUser>) {
    const Logger: Logger = Container.get('logger');
    try {
      Logger.info(`✌ User signup success ${device_uuid}`);
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);
      throw e;
    }
  }
}
