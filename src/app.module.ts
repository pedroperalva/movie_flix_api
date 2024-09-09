import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
