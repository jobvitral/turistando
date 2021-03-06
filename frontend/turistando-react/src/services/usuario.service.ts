import {HelperCommons} from "../helpers/helper-commons";
import axios from "axios";
import {Usuario} from "../models/usuario";
import {UsuarioFilter} from "../filters/usuario-filter";
import {HelperValidation} from "../helpers/helper-validation";

export class UsuarioService
{
    private endpoint: string = HelperCommons.apiHost('usuario');

    public async buscar(id: number) : Promise<Usuario>
    {
        let url = `${this.endpoint}/busca/${id}`;
        return axios.get<Usuario>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async listar(filtro: UsuarioFilter) : Promise<Usuario[]>
    {
        let url = `${this.endpoint}/busca`;
        return axios.post<Usuario[]>(url, filtro)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async inserir(item: Usuario) : Promise<Usuario>
    {
        let url = `${this.endpoint}/insere`;
        return axios.post<Usuario>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async atualizar(item: Usuario) : Promise<Usuario>
    {
        let url = `${this.endpoint}/atualiza`;
        return axios.put<Usuario>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
    
    public async deletar(id: number) : Promise<Usuario>
    {
        let url = `${this.endpoint}/deleta/${id}`;
        return axios.delete<Usuario>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
}
