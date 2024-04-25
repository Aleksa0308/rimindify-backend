import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ScheduleDto} from "./dto";

@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) {
    }

    async getSchedules(userId: number) {
        return this.prisma.schedule.findMany({
            where: {
                userId
            },
            include: {
                clientGroup: true,
                message: true
            }
        });
    }

    async getSchedule(userId: number, scheduleId: number) {
        return this.prisma.schedule.findFirst({
            where: {
                userId,
                scheduleId
            },
            include: {
                clientGroup: true,
                message: true
            }
        });
    }

    async createSchedule(userId: number, scheduleDto: ScheduleDto) {
        return this.prisma.schedule.create({
            data: {
                ...scheduleDto,
                userId
            }
        });
    }

    async updateSchedule(userId: number, scheduleId: number, scheduleDto: ScheduleDto) {
        return this.prisma.schedule.update({
            where: {
                userId,
                scheduleId
            },
            data: scheduleDto
        });
    }

    async deleteSchedule(userId: number, scheduleId: number) {
        return this.prisma.schedule.delete({
            where: {
                userId,
                scheduleId
            }
        });
    }
}
