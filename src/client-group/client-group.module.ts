import { Module } from '@nestjs/common';
import { ClientGroupController } from './client-group.controller';
import {ClientGroupService} from "./client-group.service";

@Module({
  providers: [ClientGroupService],
  controllers: [ClientGroupController]
})
export class ClientGroupModule {}
