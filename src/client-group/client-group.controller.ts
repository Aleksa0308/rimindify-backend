import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
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

    @Get(':id/missing-clients')
    async getMissingClients(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number, @Query('search') search: string){
        return this.clientGroupService.getMissingClients(userId, id, search);
    }

    @Post()
    async createClientGroup(@GetUser('userId') userId: number, @Body() dto: ClientGroupDto) {
        return this.clientGroupService.createClientGroup(userId, dto);
    }

    @Post(':id/add-client')
        async addClientToGroup(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number, @Body() dto: {clientId: number}) {
        return this.clientGroupService.addClientToGroup(userId, id, dto.clientId);
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

    @Delete(':id/remove-client/:clientId')
    async removeClientFromGroup(@GetUser('userId') userId: number, @Param('id', ParseIntPipe) id: number, @Param('clientId', ParseIntPipe) clientId: number) {
        return this.clientGroupService.removeClientFromGroup(userId, id, clientId);
    }
}
