import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/create-account', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      );
  }
}
