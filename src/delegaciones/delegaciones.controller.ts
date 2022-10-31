import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DelegacionesService } from './delegaciones.service';

@Controller('delegaciones')
export class DelegacionesController {
    public constructor(private delegacionesService : DelegacionesService) {

    }

    @Get()
    public getDelegaciones() {
        return this.delegacionesService.getDelegaciones();
    }
    @Get(":pais")
    public getDelegacion(@Param("pais") pais : string) {
        return this.delegacionesService.getDelegacion(pais);
    }
    @Post()
    public addDelegacion(@Body() nuevaDelegacion: any) {
        return this.delegacionesService.addDelegacion(nuevaDelegacion);
    }
    @Put()
    public updateDelegacion(@Body() nuevaDelegacion: any) {
        return this.delegacionesService.updateDelegacion(nuevaDelegacion);
    }
    @Delete(":pais")
    public deleteMarca(@Param("pais") pais : string) {
        return this.delegacionesService.deleteDelegacion(pais);
    }
}
