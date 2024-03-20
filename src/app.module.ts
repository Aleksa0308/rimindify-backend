import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import { ClientModule } from './client/client.module';
import { ClientGroupService } from './client-group/client-group.service';
import { ClientGroupModule } from './client-group/client-group.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientModule,
    ClientGroupModule
  ],
  providers: [],
})
export class AppModule {}
