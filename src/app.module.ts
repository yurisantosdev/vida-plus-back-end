import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as cors from 'cors';

// Controllers
import { AuthController } from './controllers/app.auth.controller';
import { UsuariosController } from './controllers/app.usuarios.controller';
import { ChecklistsController } from './controllers/app.checklists.controller';
import { VeiculosController } from './controllers/app.veiculos.controller';

//Services
import { PrismaService } from './prisma.service';
import { AuthService } from './services/app.auth.service';
import { JwtStrategy } from './helpers/JWTStrategy';
import { UsuarioService } from './services/app.usuarios.service';
import { ChecklistsService } from './services/app.checklists.service';
import { VeiculosService } from './services/app.veiculos.service';

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
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    UsuarioService,
    ChecklistsService,
    VeiculosService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
