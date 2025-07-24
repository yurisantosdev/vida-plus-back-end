/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Post,
  Request,
  Put,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChecklistsService } from 'src/services/app.checklists.service';
import { ChecklistsType } from 'src/types/ChecklistsType';

@Controller()
export class ChecklistsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: ChecklistsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('checklists/create')
  async create(@Request() @Body() Body: ChecklistsType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('checklists/update')
  async update(@Request() @Body() Body: ChecklistsType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('checklists/delete/:lccodigo')
  async delete(@Param('lccodigo') lccodigo: string) {
    return this.service.delete(lccodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checklists/find/:lccodigo')
  async find(@Param('lccodigo') lccodigo: string) {
    return this.service.find(lccodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checklists/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checklists/find/finalizados/:uscodigo')
  async findFinalizados(@Param('uscodigo') uscodigo: string) {
    return this.service.findFinalizados(uscodigo);
  }
}
