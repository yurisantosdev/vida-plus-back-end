import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as cors from 'cors';

// Controllers
import { AuthController } from './controllers/app.auth.controller';
import { UsuariosController } from './controllers/app.usuarios.controller';
import { ChecklistsController } from './controllers/app.checklists.controller';
import { VeiculosController } from './controllers/app.veiculos.controller';
import { AbastecimentosController } from './controllers/app.abastecimentos.controller';
import { ManutenconsController } from './controllers/app.manutencoes.controller';
import { DespesasController } from './controllers/app.despesas.controller';
import { ContasController } from './controllers/app.contas.controller';
import { TransacoesController } from './controllers/app.transacoes.controller';
import { CategoriasTransacoesController } from './controllers/app.categorias-transacoes.controller';

//Services
import { PrismaService } from './prisma.service';
import { AuthService } from './services/app.auth.service';
import { JwtStrategy } from './helpers/JWTStrategy';
import { UsuarioService } from './services/app.usuarios.service';
import { ChecklistsService } from './services/app.checklists.service';
import { VeiculosService } from './services/app.veiculos.service';
import { AbastecimentosService } from './services/app.abastecimentos.service';
import { ManutencoesService } from './services/app.manutencoes.service';
import { DespesasService } from './services/app.despesas.service';
import { ContasService } from './services/app.contas.service';
import { TransacoesService } from './services/app.transacoes.service';
import { CategoriasTransacoesService } from './services/app.categorias-transacoes.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [
    AuthController,
    UsuariosController,
    ChecklistsController,
    VeiculosController,
    AbastecimentosController,
    ManutenconsController,
    DespesasController,
    ContasController,
    TransacoesController,
    CategoriasTransacoesController,
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    UsuarioService,
    ChecklistsService,
    VeiculosService,
    AbastecimentosService,
    ManutencoesService,
    DespesasService,
    ContasService,
    TransacoesService,
    CategoriasTransacoesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
