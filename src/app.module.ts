import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { AddressModule } from './address/address.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [AuthModule, ClientModule, AddressModule],
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
})
export class AppModule { }
