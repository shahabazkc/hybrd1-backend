export declare class Bcrypt {
    static toHash(password: string): Promise<string>;
    static compare(suppliedPassword: string, storedPassword: string): Promise<unknown>;
}
