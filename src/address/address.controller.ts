import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';


@Controller({ path: 'address', version: '1' })
@ApiTags('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }
}
