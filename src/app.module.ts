import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { AddressService } from './address/address.service';


@Module({
  imports: [AuthModule, ClientModule],
  controllers: [],
  providers: [AddressService],
})
export class AppModule { }
