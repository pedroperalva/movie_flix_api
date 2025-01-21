import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser({ id, data }: { id: string; data: any }) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: data.email || undefined,
        name: data.name || undefined,
        password: data.password || undefined,
      },
    });
  }
}
