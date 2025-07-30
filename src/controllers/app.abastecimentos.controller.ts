/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Post,
  Request,
  Put,
  UseGuards,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbastecimentosService } from 'src/services/app.abastecimentos.service';
import { AbastecimentosType } from 'src/types/AbastecimentosType';

@Controller()
export class AbastecimentosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: AbastecimentosService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('abastecimentos/create')
  async create(@Request() @Body() Body: AbastecimentosType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('abastecimentos/update')
  async update(@Request() @Body() Body: AbastecimentosType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('abastecimentos/delete/:abcodigo')
  async delete(@Param('abcodigo') abcodigo: string) {
    return this.service.delete(abcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('abastecimentos/find/:abcodigo')
  async find(@Param('abcodigo') abcodigo: string) {
    return this.service.find(abcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('abastecimentos/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('abastecimentos/findAll/veiculo/:vecodigo')
  async findAllVeiculo(@Param('vecodigo') vecodigo: string) {
    return this.service.findAllVeiculo(vecodigo);
  }
}
