import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {ClientGroupService} from "./client-group.service";
import {GetUser} from "../auth/decorator";
import {JwtGuard} from "../auth/guard";
import {ClientGroupDto} from "./dto";

@UseGuards(JwtGuard)
@Controller('client-groups')
export class ClientGroupController {

    constructor(private clientGroupService: ClientGroupService) {}

    @Get()
    async getClientGroups(@GetUser('userId') userId: number){
        return this.clientGroupService.getClientGroups(userId);
    }

    @Get(':id')
    async getClientGroupById(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number){
        return this.clientGroupService.getClientGroupById(userId, id);
    }

    @Post()
    async createClientGroup(@GetUser('userId') userId: number, @Body() dto: ClientGroupDto) {
        return this.clientGroupService.createClientGroup(userId, dto);
    }

    @Put(':id')
    async updateClientGroup(@GetUser('userId') userId: number,
                            @Param('id', ParseIntPipe) id: number,
                            @Body() dto: ClientGroupDto) {
        return this.clientGroupService.updateClientGroup(userId, id, dto);
    }

    @Delete(':id')
    async deleteClientGroup(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number) {
        return this.clientGroupService.deleteClientGroup(userId, id);
    }
}
