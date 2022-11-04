import { Injectable } from '@nestjs/common';
import Delegacion from 'src/ts/delegacion';
import * as FS from 'fs';
import Integrante from 'src/ts/integrante';
import { IntegrantesService } from 'src/integrantes/integrantes.service';

@Injectable()
export class DelegacionesService {
    private delegaciones: Delegacion[]
    private integrantesService: IntegrantesService
    public constructor() {
        this.delegaciones = [];
        this.integrantesService = new IntegrantesService();
        this.loadDelegaciones();
    }

    public getDelegaciones() {
        return this.delegaciones;
    }

    public getDelegacion(pais: string) {
        try {
            if (pais) {
                for (let i = 0; i < this.delegaciones.length; i++) {
                    if (pais == this.delegaciones[i].getPais()) {
                        return this.delegaciones[i];
                    }
                    else {
                        throw new Error("Delegacion no encontrada");

                    }
                }
            }
            else {
                throw new Error("Nombre de pais invalido");

            }
        } catch (error) {
            return error.message;
        }

    }

    public addDelegacion(delegacion: any): string {
        try {
            if (delegacion) {
                if (delegacion.pais && delegacion.deporte && delegacion.integrantes) {
                    for (let i = 0; i < this.delegaciones.length; i++) {
                        if (delegacion.pais == this.delegaciones[i].getPais()) {
                            throw new Error("La delegacion ya existe");
                        }
                        else {
                            let nuevaDelegacion = new Delegacion(delegacion.pais, delegacion.deporte)
                            if (delegacion.integrantes) {
                                for (let i = 0; i < delegacion.integrantes.length; i++) {
                                    let integrante: Integrante = this.integrantesService.getIntegrante(delegacion.integrantes[i]);
                                    nuevaDelegacion.addIntegrante(integrante);
                                    this.saveDelegaciones();
                                    // this.loadDelegaciones();
                                    return "Delegacion creada con exito"
                                }
                            }
                            this.delegaciones.push(nuevaDelegacion);
                        }
                    }
                }
                else {
                    throw new Error("datos de delegacion invalidos");

                }
            }
            else {
                throw new Error("Marca invalida");

            }

        } catch (error) {
            return error.message
        }
    }


    public updateDelegacion(delegacion: any): string {
        try {
            if (delegacion) {
                if (delegacion.pais && delegacion.deporte && delegacion.integrantes) {
                    for (let i = 0; i < this.delegaciones.length; i++) {
                        if (delegacion.pais == this.delegaciones[i].getPais()) {
                            let nuevaDelegacion = new Delegacion(delegacion.pais, delegacion.deporte)
                            this.delegaciones[i] = nuevaDelegacion;
                            this.saveDelegaciones();
                            //  this.loadDelegaciones();
                            return "Delegacion Actualizada con exito";
                        }
                        else {
                            throw new Error("Pais de delegacion invalido");

                        }
                    }
                }
                else {
                    throw new Error("Datos de delegacion invalidos");

                }
            }
            else {
                throw new Error("Nueva delegacion invalida");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteDelegacion(delegacion: any): string {
        try {
            if (delegacion) {
                for (let i = 0; i < this.delegaciones.length; i++) {
                    if (delegacion.pais == this.delegaciones[i].getPais()) {
                        this.delegaciones.splice(i, 1);
                        this.saveDelegaciones();
                        //this.loadDelegaciones();
                        return "Delegacion Eliminada con exito";
                    }
                    else {
                        throw new Error("Delegacion no encontrada");

                    }
                }
            }
            else {
                throw new Error("Delegacion invalida");

            }
        } catch (error) {
            error.message;
        }
    }

    private loadDelegaciones() {
        try {
            let delegacion: Delegacion;
            let texto: string = FS.readFileSync('.\\recursos\\delegaciones.txt', 'utf8'); //Cuando cambio el nombre de la carpeta se me traba el nest

            if (texto) {
                this.delegaciones = [];
                let datos = texto.split('\n').map(p => p.replace('/r', '')).map(p => p.split(","));

                for (let i = 0; i < datos.length; i++) {
                    delegacion = new Delegacion(datos[i][0], datos[i][1]);
                    let integrantes = datos[i][2].split("-");
                    integrantes[i].trim();

                    for (let j = 0; j < integrantes.length; j++) {
                        let integrante = this.integrantesService.getIntegrante(integrantes[j])
                        delegacion.addIntegrante(integrante);
                    }

                    this.delegaciones.push(delegacion);
                }
            }
            else {
                throw new Error("Texto invalido");

            }
        } catch (error) {
            return error.message;
        }
    }
    private saveDelegaciones() {
        try {
            FS.writeFileSync('.\\recursos\\delegaciones.txt', '');
            for (let i = 0; i < this.delegaciones.length; i++) {
                let registro = this.delegaciones[i].toString();
                FS.appendFileSync('.\\recursos\\delegaciones.txt', `${i == 0 ? '' : '\n'}${registro}`);
            }
        } catch (error) {
        }
    }
}
