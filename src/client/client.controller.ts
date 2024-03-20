import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {ClientService} from "./client.service";
import {GetUser} from "../auth/decorator";
import {User} from "@prisma/client";
import {JwtGuard} from "../auth/guard";
import {ClientDto} from "./dto";
@UseGuards(JwtGuard)
@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Get()
    getClients(@GetUser('userId') user: User) {
        return this.clientService.getClients(user.userId);
    }

    @Get(':id')
    getClient(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number){
        return this.clientService.getClient(userId, id);
    }

    @Post()
    createClient(@GetUser('userId') userId: number, @Body() dto: ClientDto) {
        return this.clientService.createClient(userId, dto);
    }

    @Put(':id')
    updateClient(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number, @Body() dto: ClientDto) {
        return this.clientService.updateClient(userId, id, dto);
    }

    @Delete(':id')
    deleteClient(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number) {
        return this.clientService.deleteClient(userId, id);
    }
}
