import {IsNotEmpty, IsString} from "class-validator";

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
    @IsNotEmpty()
    appointment: Date;
}