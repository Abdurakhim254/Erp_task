import {hash, compare} from "bcrypt"


export class BcryptService {
    async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }
    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return compare(password, hashPassword);
    }
}