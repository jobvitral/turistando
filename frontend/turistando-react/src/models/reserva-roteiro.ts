import {Reserva} from "./reserva";
import {Roteiro} from "./roteiro";

export class ReservaRoteiro
{
    constructor(idReserva: number, idRoteiro: number)
    {
        this.IdReserva = idReserva;
        this.IdRoteiro = idRoteiro;
        this.Informacoes = '';
        this.Valor = 0;
        this.Avaliacao = 0;
    }

    public IdReserva: number;
    public IdRoteiro: number;
    public Informacoes: string;
    public Valor: number;
    public Avaliacao: number;

    public Reserva: Reserva;
    public Roteiro: Roteiro;
}
