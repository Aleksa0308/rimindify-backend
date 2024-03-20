import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ClientGroupDto} from "./dto";

@Injectable()
export class ClientGroupService {
    constructor(private prisma: PrismaService) {}

    async getClientGroups(userId: number) {
        return this.prisma.clientGroup.findMany({
            where: {
                userId: userId
            }
        });
    }

    async getClientGroup(userId: number, clientGroupId: number) {
        const clientGroup = await this.prisma.clientGroup.findUnique({
            where: {
                clientGroupId: clientGroupId,
                userId: userId
            }
        });

        if (!clientGroup) {
            throw new NotFoundException(`Client group with id ${clientGroupId} not found`);
        }

        return clientGroup;
    }

    async createClientGroup(userId: number, dto: ClientGroupDto) {
        try{
            return this.prisma.clientGroup.create({
                data: {
                    userId: userId,
                    name: dto.name,
                }
            });
        }catch (error){
            throw error;
        }
    }

    async updateClientGroup(userId: number, clientGroupId: number, dto: ClientGroupDto) {
        try{
            return this.prisma.clientGroup.update({
                where: {
                    clientGroupId: clientGroupId,
                    userId: userId
                },
                data: {
                    name: dto.name,
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
                userId: userId
            }
        });
    }
}
