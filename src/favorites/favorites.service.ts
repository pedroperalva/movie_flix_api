import { Injectable } from '@nestjs/common';
import { AddFavoriteDto } from './dto/add.favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {

    constructor(private readonly prisma: PrismaService) { }

    async addFavorite({ data, userId }): Promise<AddFavoriteDto> {
        return await this.prisma.favorite.create({
            data: {
                userId: userId,
                type: data.type,
                titleId: data.titleId,
                poster_path: data.poster_path,
                vote_average: data.vote_average,
                title: data.title,
            }
        });
    }

    async getUserFavorites(userId: string) {
        return await this.prisma.favorite.findMany({
            where: {
                userId,
            },
        });
    }

    async deleteFavorite({ userId, titleId }: { userId: string; titleId: string }) {
        return await this.prisma.favorite.delete({
            where: {
                userId_titleId: {
                    userId,
                    titleId,
                },
            },
        });
    }


}