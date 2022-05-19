import jwt from 'jsonwebtoken';

abstract class JWTServices {
    abstract generateToken(userData: UserData): string;
};

export interface UserData {
    id: string;
    username: string;
}

export class JWT extends JWTServices {
    constructor() {
        super()
    };
    generateToken(userData: UserData) {
        const token = jwt.sign({
            id: userData.id,
            username: userData.username
        },
            process.env.JWT_KEY!
        );

        return token;
    };

};