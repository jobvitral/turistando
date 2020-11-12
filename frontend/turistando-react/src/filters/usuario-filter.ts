import {EnumTipoUsuario} from "../helpers/enum-tipo-usuario";

export class UsuarioFilter {
    Ids: number[];
    Tipo: EnumTipoUsuario | null;
    Nome: string;
    Sexo: string;
    Cidade: string;
    Estado: string;
    Telefone: string;
    Email: string;
    Carro: string;
    Placa: string;
    AvaliacaoMinimo: number | null;
    AvaliacaoMaximo: number | null;
}
