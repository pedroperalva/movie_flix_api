import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() { name, email, password }: CreateUserDto) {
        return this.userService.createUser();
    }

    @Get(':id')
    async getUser(@Body() body: any) {
        return this.userService.getUser();
    }

    @Delete(':id')
    async deleteUser(@Body() body: any) {
        return this.userService.deleteUser();
    }

    @Patch(':id')
    async updateUser(@Body() { name, email, password }: UpdateUserDto, @Param() params) {
        return this.userService.updateUser()
    }
}