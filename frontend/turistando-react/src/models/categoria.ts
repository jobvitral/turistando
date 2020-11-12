import {RoteiroCategoria} from "./roteiro-categoria";

export class Categoria
{
    constructor()
    {
        this.Id = 0;
        this.Nome = '';
        this.RoteiroCategorias = new Array<RoteiroCategoria>();
    }

    public Id: number;
    public Nome: string;
    public RoteiroCategorias: RoteiroCategoria[];
}
