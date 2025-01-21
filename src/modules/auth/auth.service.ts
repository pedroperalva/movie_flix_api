import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return { ...result, ...user };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  generateToken(user: any): string {
    const payload = { sub: user.id, email: user.email };
    const secret = this.configService.get<string>('JWT_SECRET');
    // const expiresIn = this.configService.get<string>('JWT_EXPIRATION');

    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }

  async createUser({ email, name, password }): Promise<CreateUserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
