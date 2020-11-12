import {EnumTipoUsuario} from "../helpers/enum-tipo-usuario";
import {Roteiro} from "./roteiro";
import {Reserva} from "./reserva";

export class Usuario
{
    constructor()
    {
        this.Id = 0;
        this.Tipo = EnumTipoUsuario.Turista;
        this.Nome = '';
        this.Avatar = 'no-image.jpg';
        this.DataNascimento = new Date();
        this.Sexo = '';
        this.Cidade = '';
        this.Estado = '';
        this.Telefone = '';
        this.Email = '';
        this.Senha = '';
        this.GuiaCarro = '';
        this.GuiaPlaca = '';
        this.GuiaHorario = '';
        this.GuiaDetalhe = '';
        this.GuiaAvaliacao = 0;
        
        this.Roteiros = new Array<Roteiro>();
        this.ReservasTurista = new Array<Reserva>();
        this.ReservasGuia = new Array<Reserva>();
    }

    public Id: number;
    public Tipo: EnumTipoUsuario;
    public Nome: string;
    public Avatar: string;
    public DataNascimento: Date | Date[];
    public Sexo: string;
    public Cidade: string;
    public Estado: string;
    public Telefone: string;
    public Email: string;
    public Senha: string;
    public GuiaCarro: string;
    public GuiaPlaca: string;
    public GuiaHorario: string;
    public GuiaDetalhe: string;
    public GuiaAvaliacao: number;

    public Roteiros: Roteiro[];
    public ReservasTurista: Reserva[];
    public ReservasGuia: Reserva[];
}
