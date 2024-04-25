import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decorator";
import {ScheduleDto} from "./dto";

@UseGuards(JwtGuard)
@Controller('schedules')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {
    }

    @Get()
    async getSchedules(@GetUser('userId') userId: number) {
        return this.scheduleService.getSchedules(userId);
    }

    @Get(':id')
    async getSchedule(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) scheduleId: number) {
        return this.scheduleService.getSchedule(userId, scheduleId);
    }

    @Post()
    async createSchedule(@GetUser('userId') userId: number, @Body() scheduleDto: ScheduleDto) {
        return this.scheduleService.createSchedule(userId, scheduleDto);
    }

    @Put(':id')
    async updateSchedule(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) scheduleId: number, @Body() scheduleDto: ScheduleDto) {
        return this.scheduleService.updateSchedule(userId, scheduleId, scheduleDto);
    }

    @Delete(':id')
    async deleteSchedule(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) scheduleId: number) {
        return this.scheduleService.deleteSchedule(userId, scheduleId);
    }
}
