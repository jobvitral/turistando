import {EnumTipoUsuario} from "./enum-tipo-usuario";

export class HelperSessao
{
    constructor()
    {
        this.Id = 0;
        this.Tipo = null;
        this.Nome = '';
        this.Email = '';
        this.Avatar = 'no-image.jpg'
    }

    public Id: number;
    public Tipo: EnumTipoUsuario | null;
    public Nome: string;
    public Email: string;
    public Avatar: string;
}
