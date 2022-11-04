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
                
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (nuevoIntegrante.apellidoNombres == this.integrantes[i].getApellidoNombres()) {
                        throw new Error("El intengrante ya se encuentra en la lista");
                    }
                    
                }
                
                if (nuevoIntegrante.acceso) {
                    integranteCreado = new Dirigente(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                        nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.acceso, nuevoIntegrante.jefe)
                    this.integrantes.push(integranteCreado);


                }
                else if (nuevoIntegrante.marcas) {
                    
                    let marcas : Marca[] =[];
                    for (let i = 0; i < nuevoIntegrante.marcas.length; i++) {
                      let  marca : Marca= new Marca(nuevoIntegrante.marcas[i].nombre, Number(nuevoIntegrante.marcas[i].valor));
                      marcas.push(marca)
                     
                    }
                    
                    integranteCreado = new Deportista(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                        nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan, marcas)
                    this.integrantes.push(integranteCreado);

                }
                else {
                    integranteCreado = new CuerpoTecnico(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                        nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                    this.integrantes.push(integranteCreado);


                }
                this.saveIntegrantes();
                this.loadIntegrantes();
                return "Integrante creado con exito";
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
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan, nuevoIntegrante.marcas)
                            this.integrantes[i] = integranteCreado;
                        }
                        else {
                            integranteCreado = new CuerpoTecnico(nuevoIntegrante.credencial, nuevoIntegrante.apellidoNombres, nuevoIntegrante.fechaNacimiento,
                                nuevoIntegrante.paisNacimiento, nuevoIntegrante.deporte, nuevoIntegrante.rol, nuevoIntegrante.capitan)
                            this.integrantes[i] = integranteCreado;
                        }
                        this.saveIntegrantes();
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
                    if (nombre.toUpperCase() == this.integrantes[i].getApellidoNombres().toUpperCase()) {
                        this.integrantes.splice(i, 1);
                        this.saveIntegrantes();
                        this.loadIntegrantes();
                        return "Integrante eliminado con exito";
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
            let capitan : any;
            let texto: string = FS.readFileSync('.\\recursos\\integrantes.txt', 'utf8');
            if (texto) {
                this.integrantes = [];
                let datos = texto.split('\n').map(p => p.replace('\r', "")).map(p => p.split(","));
                for (let i = 0; i < datos.length; i++) {
                    if (datos[i].length == 8) {
                        if (datos[i][7] == '0' || datos[i][7] == '1') {
                            let jefe = (Number(datos[i][7]) == 1)
                            integrante = new Dirigente(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                                datos[i][4], datos[i][5], Number(datos[i][6]), jefe);
                        }
                        else {
                            capitan = ((Number(datos[i][6]) == 1))
                            
                            let marcasDatos = datos[i][7].split('-');
                            let marcas : Marca[] = [];
                            for (let j = 0; j < marcasDatos.length; j++) {
                                let marca: Marca = this.marcaService.getMarca(marcasDatos[j]);
                                marcas.push(marca);
                               
                            }
                            
                            integrante = new Deportista(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                                datos[i][4], datos[i][5], capitan, marcas);

                        }
                    }
                    else {
                        capitan = ((Number(datos[i][6]) == 1))
                        integrante = new CuerpoTecnico(datos[i][0], datos[i][1], Number(datos[i][2]), datos[i][3],
                            datos[i][4], datos[i][5], capitan);

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
    private saveIntegrantes() {
        FS.writeFileSync('.\\recursos\\integrantes.txt', '');
        for (let i = 0; i < this.integrantes.length; i++) {
            let registro = this.integrantes[i].toString();
            FS.appendFileSync('.\\recursos\\integrantes.txt', `${i == 0 ? '' : '\n'}${registro}`);
        }

    }
}
