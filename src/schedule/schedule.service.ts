import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) {
    }

    async getSchedules(userId: number) {
        return this.prisma.schedule.findMany({
            where: {
                userId
            }
        });
    }

    async getSchedule(userId: number, scheduleId: number) {
        return this.prisma.schedule.findFirst({
            where: {
                userId,
                scheduleId
            }
        });
    }
}
