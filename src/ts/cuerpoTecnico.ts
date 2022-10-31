import Integrante from "./integrante";

export default class CuerpoTecnico extends Integrante {
    private capitan: boolean;

    public constructor(credencial: string, apellidoNombres: string, fechaNacimiento: number,
        paisNacimiento: string, deporte: string, rol: string,capitan: boolean) {
        super(credencial,apellidoNombres,fechaNacimiento,paisNacimiento,deporte,rol)

        this.capitan = capitan;
    }

    public isCapitan(): boolean {
        return this.capitan;
    }
    
    public setCapitan(): void {
        this.capitan = !this.capitan;
    }
    public toString(): string {
        let datos : string ='';
        datos += `${super.getCredencial()},${super.getApellidoNombres()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.capitan}`;
        return datos;
    }
}