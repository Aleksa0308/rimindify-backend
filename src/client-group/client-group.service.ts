import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ClientGroupDto} from "./dto";
import {ClientService} from "../client/client.service";

@Injectable()
export class ClientGroupService {
    constructor(private prisma: PrismaService, private clientService: ClientService) {}

    async getClientGroups(userId: number) {
        return this.prisma.clientGroup.findMany({
            where: {
                userId: userId
            }
        });
    }

    async getClientGroupById(userId: number, clientGroupId: number) {
        // get all the info and get all the clients in the group it needs to be a join
        const clientGroup = await this.prisma.clientGroup.findMany({
            where: { clientGroupId },
            include: { clients: {include: {client: true}} }
        });

        if (!clientGroup) {
            throw new NotFoundException(`Client group with id ${clientGroupId} not found`);
        }

        // map over the clients and return the client
        const result = clientGroup.map((clientGroup)=> {
            return {...clientGroup, clients: clientGroup.clients.map((client)=> client.client)}
        })

        return result[0];
    }

    async getMissingClients(userId: number, clientGroupId: number, search: string) {
        // get all clients that are not in the group
        return this.prisma.client.findMany({
            where: {
                userId: userId,
                NOT: {
                    clientGroups: {
                        some: {
                            clientGroupId: clientGroupId
                        }
                    }
                },
                OR: [
                    {
                        firstName: {
                            contains: search,
                        }
                    },
                    {
                        lastName: {
                            contains: search,
                        }
                    },
                    {
                        nickName: {
                            contains: search,
                        }
                    },
                    {
                        phone: {
                            contains: search,
                        }
                    }
                ]
            }
        });
    }

    async createClientGroup(userId: number, dto: ClientGroupDto) {
        try{
            return this.prisma.clientGroup.create({
                data: {
                    userId: userId,
                    name: dto.name,
                    description: dto.description
                }
            });
        }catch (error){
            throw error;
        }
    }

    async addClientToGroup(userId: number, clientGroupId: number, clientId: number) {
        // check if the user owns the client
        await this.clientService.getClientById(userId, clientId);
        // check if the client is already in the group
        const isClientInGroup = await this.isClientInGroup(userId, clientGroupId, clientId);
        if (isClientInGroup) {
            throw new Error(`Client is already in the group`);
        }
        // add the client to the group
        return this.prisma.clientClientGroup.create({
            data: {
                clientGroupId: clientGroupId,
                clientId: clientId
            }
        });
    }

    async updateClientGroup(userId: number, clientGroupId: number, dto: ClientGroupDto) {
        try{
            return this.prisma.clientGroup.update({
                where: {
                    clientGroupId: clientGroupId,
                    // userId: userId
                },
                data: {
                    name: dto.name,
                    description: dto.description
                }
            });
        }catch (error){
            throw error;
        }
    }

    async deleteClientGroup(userId: number, clientGroupId: number) {
        return this.prisma.clientGroup.delete({
            where: {
                clientGroupId: clientGroupId,
                // userId: userId
            }
        });
    }

    async isClientInGroup(userId: number, clientGroupId: number, clientId: number) {
        const clientGroup = await this.prisma.clientClientGroup.findFirst({
            where: {
                clientGroupId: clientGroupId,
                clientId: clientId
            }
        });

        return clientGroup;
    }
}
