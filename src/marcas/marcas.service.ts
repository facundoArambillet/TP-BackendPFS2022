import { Injectable } from '@nestjs/common';
import Marca from 'src/ts/marca';
import * as FS from 'fs';

@Injectable()
export class MarcasService {
    private marcas: Marca[];

    public constructor() {
        this.marcas = [];
        this.loadMarcas();
    }

    public getMarcas() {
        return this.marcas;
    }

    public getMarca(nombre: string) {
        try {
            if (nombre) {
                for (let i = 0; i < this.marcas.length; i++) {
                   //console.log(this.marcas[i].getNombre())
                    if (nombre == this.marcas[i].getNombre()) {
                        return this.marcas[i];
                    }

                }
            }
            else {
                throw new Error("Nombre de marca invalido");

            }
        } catch (error) {
            console.log("Error getMarca")
            return error.message;
        }

    }

    public addMarca(marca: any): string {
        try {
            if (marca) {
                if (marca.nombre && marca.valor) {
                    
                    for (let i = 0; i < this.marcas.length; i++) {
                        if (marca.nombre == this.marcas[i].getNombre()) {
                            throw new Error("La marca ya existe");
                            ;
                        }
                        else {
                            let nuevaMarca = new Marca(marca.nombre, marca.valor);
                            this.marcas.push(nuevaMarca);
                            this.saveMarcas();
                            this.loadMarcas();
                            return "Marca Creada con exito";
                        }
                    }
                }
                else {
                    throw new Error("Nombre o valor de marca invalidos");

                }
            }
            else {
                throw new Error("Marca invalida");

            }

        } catch (error) {
            return error.message
        }
    }


    public updateMarca(marca: any): string {
        try {
            if (marca) {
                if (marca.nombre && marca.valor) {
                    for (let i = 0; i < this.marcas.length; i++) {
                        if (marca.nombre == this.marcas[i].getNombre()) {
                            let nuevaMarca = new Marca(marca.nombre, marca.valor)
                            this.marcas[i] = nuevaMarca;
                            this.saveMarcas();
                            this.loadMarcas();
                            return "Marca Actualizada con exito";
                        }
                        else {
                            throw new Error("Nombre de marca no encontrada");

                        }
                    }
                }
                else {
                    throw new Error("Nombre y Valor de marca invalidos");

                }
            }
            else {
                throw new Error("Marca invalida");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteMarca(marca: any): string {
        try {
            if (marca) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (marca.nombre == this.marcas[i].getNombre()) {
                        this.marcas.splice(i, 1);
                        this.saveMarcas();
                        this.loadMarcas();
                        return "Marca Eliminada con exito";
                    }
                    else {
                        throw new Error("Marca no encontrada");

                    }
                }
            }
            else {
                throw new Error("Marca invalido");

            }
        } catch (error) {
            error.message;
        }
    }

    private loadMarcas() {
        try {
            let marca: Marca;
            let texto: string = FS.readFileSync('.\\recursos\\marcas.txt', 'utf8');
            if (texto) {
                this.marcas = [];
                let datos = texto.split('\n').map(p => p.replace('\r', '')).map(p => p.split(","));
                for (let i = 0; i < datos.length; i++) {
                    let registro = datos[i];
                    for(let j = 0; j < registro.length; j++) {
                       let nuevoRegistro = registro[j].split("-");
                        marca = new Marca(nuevoRegistro[0], Number(nuevoRegistro[1]));
                        this.marcas.push(marca);
                    }

                }
            }
            else {
                throw new Error("Texto invalido");

            }
        } catch (error) {
            return error.message;
        }
    }
    private saveMarcas() {
        try {
            FS.writeFileSync('.\\recursos\\marcas.txt', '');
            console.log(this.marcas)
            for (let i = 0; i < this.marcas.length; i++) {
                let registro = this.marcas[i].toString();
                //console.log(registro)
                FS.appendFileSync('.\\recursos\\marcas.txt', `${i == 0 ? '' : '\n'}${registro}`);
            }
        } catch (error) {
        }
    }
}
