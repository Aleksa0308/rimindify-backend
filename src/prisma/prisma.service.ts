import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient{
    [x: string]: any;
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            },
        });
    }
}
