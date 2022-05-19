declare abstract class JWTServices {
    abstract generateToken(userData: UserData): string;
}
export interface UserData {
    id: string;
    username: string;
}
export declare class JWT extends JWTServices {
    constructor();
    generateToken(userData: UserData): string;
}
export {};
