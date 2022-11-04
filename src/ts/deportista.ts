import Integrante from "./integrante";
import Marca from "./marca";

export default class Deportista extends Integrante {
    private capitan: boolean;
    private marcas: Marca[];

    public constructor(credencial: string, apellidoNombres: string, fechaNacimiento: number,
        paisNacimiento: string, deporte: string, rol: string, capitan: boolean, marcas: Marca[]) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol)

        this.capitan = capitan;
        this.marcas = marcas;
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

    public addMarca(nuevasMarcas: Marca[]) {
        try {
            if(nuevasMarcas) {
                for(let i = 0; i < this.marcas.length; i++) {
                    console.log(this.marcas[i])
                    console.log(nuevasMarcas[i])
                    if(nuevasMarcas[i].getNombre() == this.marcas[i].getNombre() && nuevasMarcas[i].getValor() == this.marcas[i].getValor()) {
                        throw new Error("La marca ya existe");
                        
                    }
                    else {
                        for(let j = 0; j < nuevasMarcas.length; j++) {
                            this.marcas.push(nuevasMarcas[j]);
                        }
                        
                    }
                }
                return "Marca añadida con exito";
                
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
        let textoMarcas : string = ''
        console.log(this.marcas[0])
       //console.log(this.marcas[0].getValor())
       // console.log(this.marcas[0].getNombre())
        
        for(let i = 0; i < this.marcas.length; i ++) {
            textoMarcas += `${i==0? "" : "-"}${this.marcas[i].getNombre()}`
        }
        
        datos += `${super.getCredencial()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.capitan?1:0},${textoMarcas}`;
        return `${datos}`;
    }
}