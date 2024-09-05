import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 0,
        minLowercase: 1,
        minSymbols: 0

    })
    password: string;
}