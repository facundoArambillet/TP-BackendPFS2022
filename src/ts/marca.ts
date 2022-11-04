
export default class Marca {
    private nombre: string;
    private valor: number;

    public constructor(nombre: string, valor: number) {
        this.nombre = nombre;
        this.valor = valor;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public getValor(): number {
        return this.valor;
    }

    public setNombre(nuevoNombre: string) : void {
        this.nombre = nuevoNombre;
    }
    public setValor(nuevoValor: number) : void {
        this.valor = nuevoValor;
    }

    public toString(): string {
        return `${this.nombre}-${this.valor}`
    }
}