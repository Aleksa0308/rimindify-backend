import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {MessageService} from "./message.service";
import {GetUser} from "../auth/decorator";
import {JwtGuard} from "../auth/guard";
import {MessageDto} from "./dto";

@UseGuards(JwtGuard)
@Controller('messages')
export class MessageController {

    constructor(private messageService: MessageService) {}

    @Get()
    async getMessages(@GetUser('userId') userId: number){
        return this.messageService.getMessages(userId);
    }

    @Get(':id')
    async getMessageById(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number){
        return this.messageService.getMessageById(userId, id);
    }

    @Post()
    async createMessage(@GetUser('userId') userId: number, @Body() dto: MessageDto) {
        return this.messageService.createMessage(userId, dto);
    }

    @Put(':id')
    async updateMessage(@GetUser('userId') userId: number,
                        @Param('id', ParseIntPipe) id: number,
                        @Body() dto: MessageDto) {
        return this.messageService.updateMessage(userId, id, dto);
    }

    @Delete(':id')
    async deleteMessage(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number) {
        return this.messageService.deleteMessage(userId, id);
    }
}
