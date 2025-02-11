import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ClientService } from 'src/client/client.service';

const jwtConfig = JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '3600S' },
});



@Module({
  imports: [jwtConfig],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ClientService],
})
export class AuthModule { }
