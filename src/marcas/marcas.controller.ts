import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MarcasService } from './marcas.service';

@Controller('marcas')
export class MarcasController {
    public constructor(private marcasService: MarcasService) {

    }

    @Get()
    public getMarcas() {
        return this.marcasService.getMarcas();
    }
    @Get(":nombre")
    public getMarca(@Param("nombre") nombre : string) {
        return this.marcasService.getMarca(nombre);
    }
    @Post()
    public addMarca(@Body() nuevaMarca: any) {
        return this.marcasService.addMarca(nuevaMarca);
    }
    @Put()
    public updateMarca(@Body() nuevaMarca: any) {
        return this.marcasService.updateMarca(nuevaMarca);
    }
    @Delete(":nombre")
    public deleteMarca(@Param("nombre") nombre : string) {
        return this.marcasService.deleteMarca(nombre);
    }
}
