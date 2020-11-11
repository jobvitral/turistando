import {HelperCommons} from "../helpers/helper-commons";
import axios, {AxiosResponse} from "axios";
import {HelperLogin} from "../helpers/helper-login";
import {Usuario} from "../models/usuario";
import {UsuarioFilter} from "../filters/usuario-filter";

export class UsuarioService
{
    private endpoint: string = HelperCommons.apiHost('usuario');

    public async lista(filtro: UsuarioFilter) : Promise<AxiosResponse<Usuario[]>>
    {
        let url = `${this.endpoint}/busca`;
        let request = axios.post<Usuario[]>(url, filtro);

        return request;
    }

    public async insere(item: Usuario) : Promise<AxiosResponse<Usuario>>
    {
        let url = `${this.endpoint}/insere`;
        let request = axios.post<Usuario>(url, item);

        return request;
    }
}
