import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class ClientGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}