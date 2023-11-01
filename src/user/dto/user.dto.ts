import { IsString, IsArray, MinLength } from "class-validator";

export class UserDto { 
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

}