/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Post,
  Request,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from '../services/app.usuarios.service';
import { UsuarioType } from 'src/types/UsuariosType';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsuariosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: UsuarioService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Post('usuarios/create')
  async create(@Request() @Body() Body: UsuarioType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('usuarios/update')
  async update(@Request() @Body() Body: UsuarioType) {
    return this.service.update(Body);
  }
}
