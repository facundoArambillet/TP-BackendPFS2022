
export default class Marca {
    private nombre: string;
    private valor: string;

    public constructor(nombre: string, valor: string) {
        this.nombre = nombre;
        this.valor = valor;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public getValor(): string {
        return this.valor;
    }

    public setNombre(nuevoNombre: string) : void {
        this.nombre = nuevoNombre;
    }
    public setValor(nuevoValor: string) : void {
        this.valor = nuevoValor;
    }

    public toString() {
        
    }
}