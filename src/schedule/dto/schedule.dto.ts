import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class ScheduleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    clientGroupId: number;

    @IsNumber()
    @IsNotEmpty()
    messageId: number;

    @IsString()
    @IsOptional()
    status: ScheduleStatus;

    @IsString()
    @IsNotEmpty()
    reminderInterval: ReminderIntervalEnum;

    @IsNumber()
    @IsNotEmpty()
    daysBeforeAppointment: number;
}

export enum ScheduleStatus {
    ACTIVE= 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum ReminderIntervalEnum {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}