import { Publisher, UserRegisteredEvent } from "@hybrd1/common";
import { Subjects } from "@hybrd1/common/build/events/subjects";

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent>{
    subject: Subjects.userRegistered = Subjects.userRegistered;
};
