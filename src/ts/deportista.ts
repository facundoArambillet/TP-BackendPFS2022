import Integrante from "./integrante";
import Marca from "./marca";

export default class Deportista extends Integrante {
    private capitan: boolean;
    private marcas: Marca[];

    public constructor(credencial: string, apellidoNombres: string, fechaNacimiento: number,
        paisNacimiento: string, deporte: string, rol: string, capitan: boolean) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol)

        this.capitan = capitan;
    }

    public isCapitan(): boolean {
        return this.capitan;
    }
    public getMarcas(): Marca[] {
        return this.marcas;
    }

    public setCapitan(): void {
        this.capitan = !this.capitan;
    }
    public setMarcas(nuevasMarcas: Marca[]): void {
        this.marcas = nuevasMarcas;
    }

    public addMarca(nuevaMarca: Marca) {
        try {
            if(nuevaMarca) {
                for(let i = 0; i < this.marcas.length; i++) {
                    if(nuevaMarca.getNombre() == this.marcas[i].getNombre()) {
                        throw new Error("La marca ya existe");
                        
                    }
                    else {
                        this.marcas.push(nuevaMarca);
                        return "Marca añadida con exito";
                    }
                }
                
            }
            else {
                throw new Error("Marca invalida");
                
            }
        } catch (error) {
            return error.message;
        }
    }

    public deleteMarca(marca : Marca) {
        try {
            if(marca) {
                for(let i = 0; i < this.marcas.length; i++) {
                    if(marca.getNombre() == this.marcas[i].getNombre()) {
                        this.marcas.splice(i,1);
                        return "Marca eliminada con exito";
                    }
                    else {
                        throw new Error("Marca no encontrada");
                    }
                }
            }
            else {
                throw new Error("Marca invalida");
            }
        } catch (error) {
            return error.message;
        }
    }

    public toString(): string {
        let datos : string ='';
        let marcas : string = ''
        for(let i = 0; i < this.marcas.length; i ++) {
            marcas += `${i==0? "" : "-"}${this.marcas[i].getNombre()}`
        }
        datos += `${super.getCredencial()},${super.getApellidoNombres()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.capitan}`;
        return `${datos},${marcas}`;
    }
}