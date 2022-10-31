import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TorneosService } from './torneos.service';

@Controller('torneos')
export class TorneosController {
    public constructor(private torneosService : TorneosService) {

    }

    @Get()
    public getMarcas() {
        return this.torneosService.getTorneos();
    }
    @Get(":tipo")
    public getMarca(@Param("tipo") tipo : string) {
        return this.torneosService.getTorneo(tipo);
    }
    @Post()
    public addMarca(@Body() nuevoTorneo: any) {
        return this.torneosService.addTorneo(nuevoTorneo);
    }
    @Put()
    public updateMarca(@Body() nuevoTorneo: any) {
        return this.torneosService.updateTorneo(nuevoTorneo);
    }
    @Delete(":tipo")
    public deleteMarca(@Param("tipo") tipo : string) {
        return this.torneosService.deleteTorneo(tipo);
    }
}
