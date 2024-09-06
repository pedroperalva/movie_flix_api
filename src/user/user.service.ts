import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async createUser({ email, name, password }): Promise<CreateUserDto> {
        return this.prisma.user.create({
            data: {
                email,
                name,
                password
            }
        });
    }

    async getUser(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
    }

    async deleteUser(id: string) {
        return this.prisma.user.delete({
            where: {
                id,
            }
        });
    }

    async updateUser({ id, data }: { id: string; data: UpdateUserDto }) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                email: data.email || undefined,
                name: data.name || undefined,
                password: data.password || undefined
            }
        })
    }
}