import { Module } from '@nestjs/common';
import { ClientGroupController } from './client-group.controller';
import {ClientGroupService} from "./client-group.service";
import {ClientService} from "../client/client.service";

@Module({
  providers: [ClientGroupService, ClientService],
  controllers: [ClientGroupController],
})
export class ClientGroupModule {}
