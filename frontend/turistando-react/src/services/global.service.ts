import {HelperSessao} from "../helpers/helper-sessao";
import {Usuario} from "../models/usuario";

export class GlobalService
{
    public static getSessao(): HelperSessao
    {
        let sessao = new HelperSessao();
        let storage = localStorage.getItem('sessao');

        if(storage != null && storage != undefined)
            sessao = JSON.parse(storage);

        return sessao;
    }

    public static setSessao(usuario: Usuario): HelperSessao
    {
        let sessao = new HelperSessao();
        sessao.Id = usuario.Id;
        sessao.Nome = usuario.Nome;
        sessao.Tipo = usuario.Tipo;
        sessao.Email = usuario.Email;
        sessao.Avatar = usuario.Avatar;

        localStorage.setItem('sessao', JSON.stringify(sessao));

        return sessao;
    }

    public static closeSessao(): void
    {
        localStorage.clear();
        document.location.href = '/'
    }

    public static isAutenticado(): boolean
    {
        let sessao = this.getSessao();

        //(window as any).sessao as HelperSessao;

        if(sessao == null || sessao == undefined || sessao.Id === 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    public static verificaLogado(): void
    {
        if(this.isAutenticado() === false) {
            document.location.href = '/login';
        }
    }
}
