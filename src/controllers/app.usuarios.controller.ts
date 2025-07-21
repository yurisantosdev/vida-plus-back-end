/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Post, Request } from '@nestjs/common';
import { UsuarioService } from '../services/app.usuarios.service';
import { UsuarioType } from 'src/types/UsuariosType';

@Controller()
export class UsuariosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private usuarioService: UsuarioService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Post('usuarios/create')
  async create(@Request() @Body() Body: UsuarioType) {
    return this.usuarioService.create(Body);
  }
}
