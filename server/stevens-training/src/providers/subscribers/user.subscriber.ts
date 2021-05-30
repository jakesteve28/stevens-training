import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { User } from '../../entities/user.entity';
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return User;
    }
  
    afterInsert(event: InsertEvent<User>) {
      console.log(`User inserted, email for password dispatched to user with details: `, event.entity);
    }
  }