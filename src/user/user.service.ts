import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    createUser(): string {
        return 'Hello World!';
    }

    getUser(): string {
        return 'Hello World!';
    }

    deleteUser(): string {
        return 'Hello World!';
    }

    updateUser(): string {
        return 'Hello World!';
    }
}