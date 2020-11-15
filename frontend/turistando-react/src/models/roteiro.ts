import {ReservaRoteiro} from "./reserva-roteiro";
import {RoteiroCategoria} from "./roteiro-categoria";
import {Usuario} from "./usuario";

export class Roteiro
{
    constructor(idGuia: number)
    {
        this.Id = 0;
        this.IdGuia = idGuia;
        this.Nome = '';
        this.Imagem = 'no-image.jpg';
        this.Cidade = '';
        this.Estado = '';
        this.Descricao = '';
        this.Valor = 0;
        this.Tempo = 0;
        this.ReservaRoteiros = new Array<ReservaRoteiro>();
        this.RoteiroCategorias = new Array<RoteiroCategoria>();
    }

    public Id: number;
    public IdGuia: number;
    public Nome: string;
    public Imagem: string;
    public Cidade: string;
    public Estado: string;
    public Descricao: string;
    public Valor: number;
    public Tempo: number;

    public Guia: Usuario;
    public ReservaRoteiros: ReservaRoteiro[];
    public RoteiroCategorias: RoteiroCategoria[];
}
