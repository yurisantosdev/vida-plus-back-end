/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContasService } from '../services/app.contas.service';
import { ContasType } from 'src/types/ContasType';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ContasController {
  constructor(private service: ContasService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('contas/create')
  async create(@Request() req, @Body() body: ContasType) {
    const usuarioId = req.user.uscodigo;
    return this.service.create({ ...body, ctusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('contas/update')
  async update(@Request() req, @Body() body: ContasType) {
    const usuarioId = req.user.uscodigo;
    return this.service.update({ ...body, ctusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('contas')
  async findAll(@Request() req) {
    const usuarioId = req.user.uscodigo;
    return this.service.findAll(usuarioId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('contas/:codigo')
  async findOne(@Param('codigo') codigo: string) {
    return this.service.findOne(codigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('contas/:codigo')
  async delete(@Param('codigo') codigo: string) {
    return this.service.delete(codigo);
  }
} 