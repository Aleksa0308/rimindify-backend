import {IsDate, IsNotEmpty, IsString} from "class-validator";
import {Type} from "class-transformer";

export class ClientDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    nickName: string;
    @IsNotEmpty()
    @IsString()
    phone: string;
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    appointment: Date;
}