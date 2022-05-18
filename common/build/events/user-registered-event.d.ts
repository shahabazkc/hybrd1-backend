import { Subjects } from "./subjects";
export interface UserRegisteredEvent {
    subject: Subjects.userRegistered;
    data: {
        userId: string;
        username: string;
    };
}
