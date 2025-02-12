import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) { }

  public async deleteAddress(id: string) {
    const address = this.prisma.address.findFirst({ where: { id } });
    if (!address) throw new HttpException('Address not found', 404);
    await this.prisma.address.delete({ where: { id } });
    return { data: true, error: false };
  }

}
