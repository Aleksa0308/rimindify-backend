import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decorator";

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
}
