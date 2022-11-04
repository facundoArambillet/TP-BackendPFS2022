import Integrante from "./integrante";

export default class Dirigente extends Integrante {
    private acceso: number;
    private jefe: boolean;

    public constructor(credencial: string, apellidoNombres: string, fechaNacimiento: number,
        paisNacimiento: string, deporte: string, rol: string,acceso: number,jefe: boolean) {
        super(credencial,apellidoNombres,fechaNacimiento,paisNacimiento,deporte,rol)

        this.acceso = acceso;
        this.jefe = jefe;
    }

    public getAcceso(): number {
        return this.acceso;
    }
    public isJefe(): boolean {
        return this.jefe;
    }

    public setAcceso(nuevoAcceso): void{
        this.acceso = nuevoAcceso;
    }
    public setJefe(): void {
        this.jefe = !this.jefe;
    }

    public toString(): string {
        let datos : string ='';
        datos += `${super.getCredencial()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.acceso},${this.jefe?1:0}`;
        return datos;
    }
}