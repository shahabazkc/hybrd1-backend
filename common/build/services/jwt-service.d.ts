declare abstract class JWTServices {
    abstract generateToken(clientData: ClientData): string;
}
export interface ClientData {
    id: string;
    email: string;
}
export declare class JWT extends JWTServices {
    constructor();
    generateToken(clientData: ClientData): string;
}
export {};
