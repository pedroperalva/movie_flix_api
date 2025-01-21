import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add.favorite.dto';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Post(':userId')
    async addFavorite(@Body() data: AddFavoriteDto, @Param('userId') userId: string) {
        return this.favoritesService.addFavorite({ data, userId });
    }

    @Get(':userId')
    async getUserFavorites(@Param('userId') userId: string) {
        console.log(userId);
        return this.favoritesService.getUserFavorites(userId);
    }

    @Delete(':userId/:titleId')
    async deleteFavorite(@Param('userId') userId: string, @Param('titleId') titleId: string,) {
        return this.favoritesService.deleteFavorite({ userId, titleId });
    }

}