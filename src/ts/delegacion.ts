import CuerpoTecnico from "./cuerpoTecnico";
import Deportista from "./deportista";
import Dirigente from "./dirigente";
import Integrante from "./integrante";

export default class Delegacion {
    private pais: string;
    private deporte: string;
    private integrantes: Integrante[];

    public constructor(pais: string, deporte: string) {
        this.pais = pais;
        this.deporte = deporte;
    }

    public getPais(): string {
        return this.pais;
    }
    public getDeporte(): string {
        return this.deporte;
    }
    public getIntegrantes(): Integrante[] {
        return this.integrantes;
    }

    public setPais(nuevoPais): void {
        this.pais = nuevoPais;
    }
    public setDeporte(nuevoDeporte): void {
        this.deporte = nuevoDeporte;
    }

    public addIntegrante(nuevoIntegrante: Integrante) {
        try {
            if (nuevoIntegrante) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (nuevoIntegrante.getApellidoNombres() == this.integrantes[i].getApellidoNombres()) {
                        throw new Error("El integrante ya existe");

                    }
                }
                this.integrantes.push(nuevoIntegrante);
                return "Integrante añadido con exito";
            }
            else {
                throw new Error("Datos de integrante invalidos");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteIntegrante(integrante: Integrante) {
        try {
            if (integrante) {
                for(let i = 0; i < this.integrantes.length; i++) {
                    if(integrante.getApellidoNombres() == this.integrantes[i].getApellidoNombres()) {
                        this.integrantes.splice(i,1);
                        return "Integrante eliminado con exito";
                    }
                    else {
                        throw new Error("Integrante no encontrado");
                        
                    }
                }
            }
            else {
                throw new Error("Datos de integrante invalidos");
                
            }
        } catch (error) {
            return error.message;
        }

    }

    public toString(): string {
        let integrantes: string = '';
        for(let i = 0; i < this.integrantes.length; i++) {
            integrantes += `${i==0? "" : "-"}${this.integrantes[i].getApellidoNombres()}`
        }
        return `${this.pais},${this.deporte},${integrantes}`;
    }
}