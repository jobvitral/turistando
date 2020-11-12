import {Roteiro} from "./roteiro";
import {Categoria} from "./categoria";

export class RoteiroCategoria
{
    constructor(idRoteiro: number, idCategoria: number)
    {
        this.IdRoteiro = idRoteiro;
        this.IdCategoria = idCategoria;
    }

    public IdRoteiro: number;
    public IdCategoria: number;

    public Roteiro: Roteiro;
    public Categoria: Categoria;
}
