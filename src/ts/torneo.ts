import Delegacion from "./delegacion";

export default class Torneo {
    private sede: string;
    private edicion: number;
    private deporte: string;
    private tipo: string;
    private participantes: Delegacion[];

    public constructor(sede: string,edicion: number,deporte: string,tipo: string){
        this.sede = sede;
        this.edicion = edicion;
        this.deporte = deporte;
        this.tipo = tipo;
    }

    public getSede(): string {
        return this.sede;
    }
    public getEdicion(): number {
        return this.edicion;
    }
    public getDeporte(): string {
        return this.deporte;
    }
    public getTipo(): string {
        return this.tipo;
    }
    public getParticipantes(): Delegacion[] {
        return this.participantes;
    }

    public setSede(nuevaSede: string): void {
        this.sede = nuevaSede;
    }
    public setEdicion(nuevaEdicion: number): void {
        this.edicion = nuevaEdicion;
    }
    public setDeporte(nuevoDeporte: string): void {
        this.deporte = nuevoDeporte;
    }
    public setTipo(nuevoTipo: string): void {
        this.tipo = nuevoTipo;
    }
    public setParticipantes(nuevosParticipantes: Delegacion[]): void {
        this.participantes = nuevosParticipantes;
    }

    public addDelegacion(nuevaDelegacion: Delegacion) {
        try {
            if (nuevaDelegacion) {
                for (let i = 0; i < this.participantes.length; i++) {
                    if (nuevaDelegacion.getPais() != this.participantes[i].getPais()) {
                        this.participantes.push(nuevaDelegacion);
                        return "Delegacion añadido con exito";
                    }
                    else {
                        throw new Error("La Delegacion ya existe");

                    }
                }
            }
            else {
                throw new Error("Datos de delegacion invalidos");

            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteIntegrante(delegacion: Delegacion) {
        try {
            if (delegacion) {
                for(let i = 0; i < this.participantes.length; i++) {
                    if(delegacion.getPais() == this.participantes[i].getPais()) {
                        this.participantes.splice(i,1);
                        return "Delegacion eliminada con exito";
                    }
                    else {
                        throw new Error("Delegacion no encontrada");
                        
                    }
                }
            }
            else {
                throw new Error("Datos de delegacion invalidos");
                
            }
        } catch (error) {
            return error.message;
        }

    }
    public toString(): string{
        let datos : string = '';
        let participantes : string = '';
        for(let i = 0; i < this.participantes.length; i++) {
            participantes += `${i==0? "" : "-"}${this.participantes[i].getPais()}`;
        }
        datos += `${this.sede},${this.edicion},${this.deporte},${this.tipo},${this.participantes}`;
        return `${datos},${participantes}`;
    }
}