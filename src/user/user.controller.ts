import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() { name, email, password }: CreateUserDto) {
        return this.userService.createUser({ name, email, password });
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        console.log(id);
        return this.userService.getUser(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Patch(':id')
    async updateUser(@Body() data: UpdateUserDto, @Param('id') id: string) {
        return this.userService.updateUser({ id, data })
    }
}