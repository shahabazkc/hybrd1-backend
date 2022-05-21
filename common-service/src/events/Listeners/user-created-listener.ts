import { UserRegisteredEvent, Listener, Subjects } from '@hybrd1/common';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';
import { queueGroupName } from './queue-group-name';

export class UserCreatedListener extends Listener<UserRegisteredEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.userRegistered = Subjects.userRegistered;
    async onMessage(data: UserRegisteredEvent['data'], msg: Message) {

        console.log("event received");
        
        const user = await User.findOne({ userId: data.userId });

        if (user) throw new Error('User Already Found');

        const userBuild = User.build({
            userId: data.userId,
            userType: data.typeOfUser
        });

        //Save to Db
        await userBuild.save();

        msg.ack();
    }
}