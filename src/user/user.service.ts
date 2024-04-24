import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UpdateUserDto} from "./dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async updateMe(userId: number, dto: UpdateUserDto){
        return this.prisma.user.update({
            where: {userId},
            data: dto
        });
    }
}
