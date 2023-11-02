import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('signup')
    async createUser(@Body() userDto: UserDto): Promise<any> {
        return this.userService.createUser(userDto);
    }
    @Post('signin')
    async signIn(@Body() userDto: UserDto): Promise<any> {
        return this.userService.signIn(userDto);
    }
    
}
