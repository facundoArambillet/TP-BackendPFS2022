import { Injectable } from '@nestjs/common';
import Torneo from 'src/ts/torneo';
import * as FS from 'fs';
import { DelegacionesService } from 'src/delegaciones/delegaciones.service';

@Injectable()
export class TorneosService {
    private torneos: Torneo[];
    private delegacionesService: DelegacionesService
    public constructor() {
        this.torneos = [];
        this.delegacionesService;
        this.loadTorneos();
    }

    public getTorneos() {
        return this.torneos;
    }

    public getTorneo(tipo: string) {
        try {
            if (tipo) {
                for (let i = 0; i < this.torneos.length; i++) {
                    if (tipo == this.torneos[i].getTipo()) {
                        return this.torneos[i];
                    }
                    else {
                        throw new Error("Torneo no encontrada");

                    }
                }
            }
            else {
                throw new Error("Tipo de torneo invalido");

            }
        } catch (error) {
            return error.message;
        }

    }

    public addTorneo(torneo: any): string {
        try {
            if (torneo) {
                if (torneo.sede && torneo.edicion && torneo.deporte && torneo.tipo && torneo.participantes) {
                    for (let i = 0; i < this.torneos.length; i++) {
                        if (torneo.tipo == this.torneos[i].getTipo()) {
                            throw new Error("El Torneo ya existe");
                            ;
                        }
                        else {
                            let nuevoTorneo = new Torneo(torneo.sede, torneo.edicion, torneo.deporte, torneo.tipo);
                            this.torneos.push(nuevoTorneo);
                            this.saveTorneos();
                            this.loadTorneos();
                            return "Torneo Creado con exito";
                        }
                    }
                }
                else {
                    throw new Error("Datos de torneo invalidos");

                }
            }
            else {
                throw new Error("Torneo invalido");

            }

        } catch (error) {
            return error.message;
        }
    }


    public updateTorneo(torneo: any): string {
        try {
            if (torneo) {
                if (torneo.sede && torneo.edicion && torneo.deporte && torneo.tipo && torneo.participantes) {
                    for (let i = 0; i < this.torneos.length; i++) {
                        if (torneo.tipo == this.torneos[i].getTipo()) {
                            let nuevoTorneo = new Torneo(torneo.sede, torneo.edicion, torneo.deporte, torneo.tipo)
                            this.torneos[i] = nuevoTorneo;
                            this.saveTorneos();
                            this.loadTorneos();
                            return "Torneo Actualizado con exito";
                        }
                        else {
                            throw new Error("Tipo de torneo no encontrado");

                        }
                    }
                }
                else {
                    throw new Error("Datos de torneo invalidos");

                }
                this.saveTorneos()
                this.loadTorneos();
            }
            else {
                throw new Error("Torneo invalida");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteTorneo(torneo: any): string {
        try {
            if (torneo) {
                if (torneo.sede && torneo.edicion && torneo.deporte && torneo.tipo && torneo.participantes) {
                    for (let i = 0; i < this.torneos.length; i++) {
                        if (torneo.tipo == this.torneos[i].getTipo()) {
                            this.torneos.splice(i, 1);
                            this.saveTorneos();
                            this.loadTorneos();
                            return "Torneo Eliminado con exito";
                        }
                        else {
                            throw new Error("Torneo no encontrado");

                        }
                    }
                }
                else {
                    throw new Error("Datos de torneo invalidos");

                }

            }
            else {
                throw new Error("Torneo invalido");

            }
        } catch (error) {
            error.message;
        }
    }

    private loadTorneos() {
        try {
            let torneo: Torneo;
            let texto: string = FS.readFileSync('.\\resources\\marcas.txt', 'utf8');
            if (texto) {
                this.torneos = [];
                let datos = texto.split('\n').map(p => p.replace("\r", "")).map(p => p.split(","));

                for (let i = 0; i < datos.length; i++) {
                    torneo = new Torneo(datos[i][0], Number(datos[i][1]), datos[i][2], datos[i][3]);
                    let participantes = datos[i][4].split("-");
                    for (let j = 0; j < participantes.length; i++) {
                        let participante = this.delegacionesService.getDelegacion(participantes[j]);
                        torneo.addDelegacion(participante);
                    }
                    this.torneos.push(torneo);
                }
            }
            else {
                throw new Error("Texto Invalido");

            }
        } catch (error) {
            return error.message;
        }
    }

    private saveTorneos() {
        try {
            FS.writeFileSync('.\\resources\\torneos.txt', '');
            for (let i = 0; i < this.torneos.length; i++) {
                let registro = this.torneos[i].toString();
                FS.appendFileSync('.\\resources\\torneos.txt', `${i == 0 ? '' : '\n'}${registro}`);
            }
        } catch (error) {
        }
    }
}
