import {Usuario} from "./usuario";
import {ReservaRoteiro} from "./reserva-roteiro";

export class Reserva 
{
    constructor(idTurista: number, idGuia: number) 
    {
        this.Id = 0;
        this.IdTurista = idTurista;
        this.IdGuia = idGuia;
        this.DataCriacao = new Date();
        this.DataReserva = new Date();
        this.Horario = '';
        this.Local = '';
        this.ValorTotal = 0;
        this.Avaliacao = 0;
        this.ReservaRoteiros = new Array<ReservaRoteiro>();
    }

    public Id: number;
    public IdTurista: number;
    public IdGuia: number;
    public DataCriacao: Date;
    public DataReserva: Date;
    public Horario: string;
    public Local: string;
    public ValorTotal: number;
    public Avaliacao: number;

    public Turista: Usuario;
    public Guia: Usuario;
    public ReservaRoteiros: ReservaRoteiro[];
}
