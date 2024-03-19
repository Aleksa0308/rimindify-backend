import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ClientDto} from "./dto";

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) {
    }
    async getClient(userId: number, clientId: number) {
        return this.prisma.client.findUnique({
            where: {
                clientId: clientId,
                userId: userId
            }
        });
    }

    async getClients(userId: number) {
        return this.prisma.client.findMany({
            where: {
                userId: userId
            }
        });
    }

    async createClient(userId: number, dto: ClientDto) {
        try{
            return this.prisma.client.create({
                data: {
                    userId: userId,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    nickName: dto.nickName,
                    phone: dto.phone,
                    appointment: dto.appointment
                }
            });
        }catch (error){
            throw error;
        }
    }

    async updateClient(userId: number, clientId: number, dto: ClientDto) {
        try{
            return this.prisma.client.update({
                where: {
                    clientId: clientId,
                    userId: userId
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    nickName: dto.nickName,
                    phone: dto.phone,
                    appointment: dto.appointment
                }
            });
        }catch (error){
            throw error;
        }
    }

    async deleteClient(userId: number, clientId: number) {
        try{
            return this.prisma.client.delete({
                where: {
                    clientId: clientId,
                    userId: userId
                }
            });
        }catch (error){
            throw error;
        }
    }
}
