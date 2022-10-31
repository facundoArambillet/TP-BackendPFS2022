import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DelegacionesController } from './delegaciones/delegaciones.controller';
import { DelegacionesService } from './delegaciones/delegaciones.service';
import { IntegrantesService } from './integrantes/integrantes.service';
import { IntegrantesController } from './integrantes/integrantes.controller';
import { MarcasController } from './marcas/marcas.controller';
import { MarcasService } from './marcas/marcas.service';
import { TorneosService } from './torneos/torneos.service';
import { TorneosController } from './torneos/torneos.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath : join (__dirname,'..','client')})
  ],
  controllers: [AppController, DelegacionesController, IntegrantesController, MarcasController, TorneosController],
  providers: [AppService, DelegacionesService, IntegrantesService, MarcasService, TorneosService],
})
export class AppModule {}
