import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    console.log(user);
    const token = this.authService.generateToken(user);

    return {
      access_token: token,
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }

  @Post('register')
  async createUser(@Body() { name, email, password }: CreateUserDto) {
    return this.authService.createUser({ name, email, password });
  }
}
