import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as cors from 'cors';

// Controllers
import { AuthController } from './controllers/app.auth.controller';
import { UsuariosController } from './controllers/app.usuarios.controller';
import { ListaComprasController } from './controllers/app.listaCompras.controller';

//Services
import { PrismaService } from './prisma.service';
import { AuthService } from './services/app.auth.service';
import { JwtStrategy } from './helpers/JWTStrategy';
import { UsuarioService } from './services/app.usuarios.service';
import { ListaComprasService } from './services/app.listaCompras.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [AuthController, UsuariosController, ListaComprasController],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    UsuarioService,
    ListaComprasService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
