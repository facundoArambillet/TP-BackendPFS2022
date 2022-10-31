import { Injectable } from '@nestjs/common';
import * as FS from 'fs';
import { MarcasService } from 'src/marcas/marcas.service';
import CuerpoTecnico from 'src/ts/cuerpoTecnico';
import Deportista from 'src/ts/deportista';
import Dirigente from 'src/ts/dirigente';
import Integrante from 'src/ts/integrante';
import Marca from 'src/ts/marca';

@Injectable()
export class IntegrantesService {
    private integrantes: Integrante[];
    private marcaService: MarcasService;

    public constructor() {
        this.integrantes = [];
        this.marcaService = new MarcasService();
        this.loadIntegrantes();
    }

    public getIntegrantes(): Integrante[] {
        return this.integrantes;
    }
    public getIntegrante(nombre: string): Integrante {
        try {
            if (nombre) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (nombre == this.integrantes[i].getApellidoNombres()) {
                        return this.integrantes[i];
                    }
                    else {
                        throw new Error("Integrante no encontrado");

                    }
                }

            }
            else {
                throw new Error("Nombre de integrante invalido");

            }
        } catch (error) {
            return error.message;
        }
    }

    public addIntegrante(nuevoIntegrante: any): string {
        let integranteCreado: any;
        try {
            if (nuevoIntegrante) {
                for (let i = 0; i <= this.integrantes.length; i++) {
                    console.log(this.integrantes[i].getApellidoNombres())
                    if (nuevoIntegrante.apellidoNombres != this.integrantes[i].getApellidoNombres()) {
                        if (nuevoIntegrante.acceso) {
                            integranteCreado = new Dirigente(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.acceso, nuevoIntegrante.jefe)
                            this.integrantes.push(integranteCreado);


                        }
                        else if (nuevoIntegrante.marca) {
                            integranteCreado = new Deportista(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                            for (let i = 0; i < nuevoIntegrante.marca.length; i++) {
                                let marca: Marca = this.marcaService.getMarca(nuevoIntegrante.marca);
                                integranteCreado.addMarca(marca)
                            }
                            this.integrantes.push(integranteCreado);


                        }
                        else {
                            integranteCreado = new CuerpoTecnico(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                            this.integrantes.push(integranteCreado);


                        }
                        this.saveIntengrantes();
                        this.loadIntegrantes();

                    }
                    else {
                        throw new Error("El intengrante ya se encuentra en la lista");

                    }
                }

            }
            else {
                throw new Error("Datos de nuevo integrante invalidos");

            }
        } catch (error) {
            return error.message;
        }
    }

    public upddateIntegrante(nuevoIntegrante: any, nombre: string) {
        let integranteCreado: any;
        try {
            if (nuevoIntegrante && nombre) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (nombre == this.integrantes[i].getApellidoNombres()) {
                        if (nuevoIntegrante.acceso != null || undefined) {
                            integranteCreado = new Dirigente(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.acceso, nuevoIntegrante.jefe)
                            this.integrantes[i] = integranteCreado;
                        }
                        else if (nuevoIntegrante.marca != null || undefined) {
                            integranteCreado = new Deportista(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                            this.integrantes[i] = integranteCreado;
                        }
                        else {
                            integranteCreado = new CuerpoTecnico(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                            this.integrantes[i] = integranteCreado;
                        }
                        this.saveIntengrantes();
                        this.loadIntegrantes();
                    }
                    else {
                        throw new Error("Integrante no encontrado");
                    }
                }
            }
            else {
                throw new Error("Datos invalidos");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteIntegrante(nombre: string) {
        try {
            if (nombre) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (nombre == this.integrantes[i].getApellidoNombres()) {
                        this.integrantes.splice(i, 1);
                        this.saveIntengrantes();
                       this.loadIntegrantes()
                        return "Integrante eliminado con exito";
                    }
                    else {
                        throw new Error("Integrante no encontrado");

                    }
                }
            }
            else {
                throw new Error("Datos de nombre invalidos");

            }
        } catch (error) {
            return error.message;
        }
    }

    private loadIntegrantes() {
        try {
            let integrante: any;
            let texto: string = FS.readFileSync('.\\resources\\integrantes.txt', 'utf8');
            if (texto) {
                
                let datos = texto.split('\n').map(p => p.replace('/r',"")).map(p => p.split(","));
                for (let i = 0; i < datos.length; i++) {
                    
                    if (datos[i].length == 8) {
                        if (datos[i][7].trim() == '0' || datos[i][7].trim() == '1') {
                            integrante = new Dirigente(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                                datos[i][4], datos[i][5], Number(datos[i][6]), Boolean(Number(datos[i][7])));


                        }
                        else {
                            integrante = new Deportista(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                                datos[i][4], datos[i][5], Boolean(Number(datos[i][6])));

                            let marcas = datos[i][7].split('-');
                            for (let j = 0; j < marcas.length; j++) {
                                let marca = this.marcaService.getMarca(marcas[j]);
                                integrante.addMarca(marca);
                            }

                        }
                    }
                    else {
                        integrante = new CuerpoTecnico(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                            datos[i][4], datos[i][5], Boolean(Number(datos[i][6])));

                    }
                    this.integrantes.push(integrante);
                }
                
            }
            else {
                throw new Error("Texto invalido");

            }
        } catch (error) {
            return error.message;
        }
    }
    private saveIntengrantes() {
        try {
            FS.writeFileSync('.\\resources\\integrantes.txt', '');
            for (let i = 0; i < this.integrantes.length; i++) {
                let registro = this.integrantes[i].toString();
                FS.appendFileSync('.\\resources\\integrantes.txt', `${i == 0 ? '' : '\n'}${registro}`);
            }
        } catch (error) {
        }
    }
}
