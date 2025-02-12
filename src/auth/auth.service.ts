import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpUserDto } from './dto/body-auth.dto';
import * as bcrypt from 'bcrypt';
import { Client } from 'src/client/entities/client.entity';
import { ClientService } from 'src/client/client.service';

const addresses = { select: { id: true, street: true, city: true, state: true, country: true, zip: true } }
const userRequestData = { id: true, email: true, name: true, lastname: true, phone: true, addresses }

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: ClientService
  ) { }

  public async checkLoginUserCredentials(email: string, password: string) {
    const { data: user, error } = await this.clientService.getOneClientBy({ email });
    if (error) throw new HttpException('whrong email or password', 401);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new HttpException('whrong email or password', 401);

    delete user.password;
    return user;
  }

  public async createNewUser(user: SignUpUserDto) {
    console.log(process.env.ALLOWED_ORIGINS);
    await this.checkIfUserExists({ email: user.email });
    const password = await this.createSaltedPassword(user.password) as string;
    return this.clientService.createClient({ ...user, password });
  }

  public getAllUsers() {
    return this.prisma.client.findMany({ select: userRequestData });
  }

  private async checkIfUserExists(params: { id: string } | { email: string }) {
    const { data: user, error } = await this.clientService.getOneClientBy(params);
    if (!error) throw new HttpException('user already exists', 409);
  }

  private async createSaltedPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
  }







}
