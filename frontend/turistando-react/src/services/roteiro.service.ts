import {HelperCommons} from "../helpers/helper-commons";
import axios from "axios";
import {Roteiro} from "../models/roteiro";
import {RoteiroFilter} from "../filters/roteiro-filter";
import {HelperValidation} from "../helpers/helper-validation";

export class RoteiroService
{
    private endpoint: string = HelperCommons.apiHost('roteiro');

    public async buscar(id: number) : Promise<Roteiro>
    {
        let url = `${this.endpoint}/busca/${id}`;
        return axios.get<Roteiro>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async listar(filtro: RoteiroFilter) : Promise<Roteiro[]>
    {
        let url = `${this.endpoint}/busca`;
        return axios.post<Roteiro[]>(url, filtro)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async inserir(item: Roteiro) : Promise<Roteiro>
    {
        let url = `${this.endpoint}/insere`;
        return axios.post<Roteiro>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async atualizar(item: Roteiro) : Promise<Roteiro>
    {
        let url = `${this.endpoint}/atualiza`;
        return axios.put<Roteiro>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
    
    public async deletar(id: number) : Promise<Roteiro>
    {
        let url = `${this.endpoint}/deleta/${id}`;
        return axios.delete<Roteiro>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
}