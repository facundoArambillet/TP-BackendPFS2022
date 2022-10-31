
export default abstract class Integrante {
    protected credencial: string;
    protected apellidoNombres: string;
    protected fechaNacimiento: number;
    protected paisNacimiento: string;
    protected deporte: string;
    protected rol: string;

    public constructor(credencial: string, apellidoNombres: string, fechaNacimiento: number,
        paisNacimiento: string, deporte: string, rol: string) {

        this.credencial = credencial;
        this.apellidoNombres = apellidoNombres;
        this.fechaNacimiento = fechaNacimiento;
        this.paisNacimiento = paisNacimiento;
        this.deporte = deporte;
        this.rol = rol;
    }

    public getCredencial(): string {
        return this.credencial;
    }
    public getApellidoNombres(): string {
        return this.apellidoNombres;
    }
    public getFechaNacimiento(): number {
        return this.fechaNacimiento;
    }
    public getPaisNacimiento(): string {
        return this.paisNacimiento;
    }
    public getDeporte(): string {
        return this.deporte;
    }
    public getRol(): string {
        return this.rol;
    }

    
    public setCredencial(nuevaCredencial: string): void {
        this.credencial = nuevaCredencial;
    }
    public setApellidoNombres(nuevoApellidoNombre: string): void {
        this.apellidoNombres = nuevoApellidoNombre;
    }
    public setFechaNacimiendo(nuevaFecha: number): void {
        this.fechaNacimiento = nuevaFecha;
    }
    public setPaisNacimiento(nuevoPais: string): void {
        this.paisNacimiento = nuevoPais;
    }
    public setDeporte(nuevoDeporte: string): void {
        this.deporte = nuevoDeporte;
    }
    public setRol(nuevoRol: string): void {
        this.rol = nuevoRol;
    }

    abstract toString(): string
}