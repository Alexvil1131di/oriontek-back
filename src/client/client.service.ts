import { HttpException, Injectable } from '@nestjs/common';
import { SignUpUserDto } from 'src/auth/dto/body-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateClientDto } from './dto/create-client.dto';

const addresses = { select: { id: true, street: true, city: true, state: true, country: true, zip: true } }
const userRequestData = { id: true, email: true, name: true, lastname: true, phone: true, addresses }

@Injectable()
export class ClientService {

  constructor(private readonly prisma: PrismaService) { }

  public getAllClients() {
    return this.prisma.client.findMany({ select: userRequestData });
  }

  public async getOneClientBy(params: { id: number } | { email: string }) {
    const user = await this.prisma.client.findFirst({ where: params });
    if (!user) return { data: null, error: true };
    return { data: user, error: false };
  }

  public createClient(user: SignUpUserDto) {
    const { addresses, ...userData } = user;
    return this.prisma.client.create({
      data: { ...userData, addresses: { create: addresses } }, select: userRequestData
    });
  }

  public async updateClient(id: number, user: UpdateClientDto) {
    const { addresses, ...userData } = user;

    const client = await this.prisma.client.findUnique({ where: { id }, select: { id: true } });
    if (!client) throw new HttpException('Client not found', 404);

    const [posts] = await this.prisma.$transaction([
      userData ? this.prisma.client.update({ where: { id }, data: { ...userData }, select: userRequestData }) : undefined,
      ...addresses.map(address =>
        this.prisma.address.upsert({
          where: { id: address.id || 0 },
          update: { ...address },
          create: { ...address, clientId: id }
        }))
    ].filter(Boolean));

    return this.prisma.client.findUnique({ where: { id }, select: userRequestData });
  }

}
