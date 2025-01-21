import { CreateUserDto } from 'src/modules/auth/dto/create.user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
