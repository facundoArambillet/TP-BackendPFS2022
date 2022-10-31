import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';

@Controller('integrantes')
export class IntegrantesController {
    public constructor(private integrantesService: IntegrantesService) {

    }
    @Get()
    public getIntegrantes() {
        return this.integrantesService.getIntegrantes();
    }
    @Get(":nombre")
    public getIntegrante(@Param("nombre") nombre : string) {
        return this.integrantesService.getIntegrante(nombre);
    }
    @Post()
    public addIntegrantes(@Body() nuevaMarca: any) {
        return this.integrantesService.addIntegrante(nuevaMarca);
    }
    @Put(":nombre")
    public updateIntegrante(@Body() nuevaMarca: any, @Param("nombre") nombre : string) {
        return this.integrantesService.upddateIntegrante(nuevaMarca, nombre);
    }
    @Delete(":nombre")
    public deleteIntegrante(@Param("nombre") nombre : string) {
        return this.integrantesService.deleteIntegrante(nombre);
    }
}
