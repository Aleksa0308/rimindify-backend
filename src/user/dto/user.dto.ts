import {IsOptional, IsString} from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    whatsapp: string;
    @IsString()
    @IsOptional()
    viber: string;
}