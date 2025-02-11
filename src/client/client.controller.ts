import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateClientDto } from './dto/create-client.dto';

@Controller({ path: 'client', version: '1' })
@ApiTags('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get('get')
  @ApiOperation({ summary: 'Retrieve all clients' })
  @ApiResponse({ status: 200, description: 'List of clients' })
  async get() {
    return await this.clientService.getAllClients();
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return await this.clientService.updateClient(+id, body);
  }
}
