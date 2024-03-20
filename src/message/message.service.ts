import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {MessageDto} from "./dto";

@Injectable()
export class MessageService {

    constructor(private prisma: PrismaService) {}

    async getMessages(userId: number) {
        return this.prisma.message.findMany({
            where: {
                userId
            }
        });
    }

    async getMessageById(userId: number, messageId: number) {
        const message = await this.prisma.message.findFirst({
            where: {
                messageId,
                userId
            }
        });

        if (!message) {
            throw new NotFoundException(`Message with id ${messageId} not found`);
        }

        return message;
    }

    async createMessage(userId: number, dto: MessageDto) {
        return this.prisma.message.create({
            data: {
                title: dto.title,
                content: dto.content,
                userId
            }
        });
    }

    async updateMessage(userId: number, messageId: number, dto: MessageDto) {
        return this.prisma.message.update({
            where: {
                messageId,
                userId
            },
            data: {
                title: dto.title,
                content: dto.content
            }
        });
    }

    async deleteMessage(userId: number, messageId: number) {
        return this.prisma.message.delete({
            where: {
                messageId,
                userId
            }
        });
    }

}
