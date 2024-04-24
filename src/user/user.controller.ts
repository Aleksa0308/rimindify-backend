import {Body, Controller, Get, Put, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decorator";
import {User} from "@prisma/client";
import {UpdateUserDto} from "./dto";
import {UserService} from "./user.service";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    getMe(@GetUser('') user: User) {
        return user;
    }

    @Put('me')
    updateMe(@GetUser('') user: User, @Body() dto: UpdateUserDto) {
        return this.userService.updateMe(user.userId, dto);
    }
}
