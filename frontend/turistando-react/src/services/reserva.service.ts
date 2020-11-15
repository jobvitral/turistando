import {HelperCommons} from "../helpers/helper-commons";
import axios from "axios";
import {Reserva} from "../models/reserva";
import {ReservaFilter} from "../filters/reserva-filter";
import {HelperValidation} from "../helpers/helper-validation";

export class ReservaService
{
    private endpoint: string = HelperCommons.apiHost('reserva');

    public async buscar(id: number) : Promise<Reserva>
    {
        let url = `${this.endpoint}/busca/${id}`;
        return axios.get<Reserva>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async listar(filtro: ReservaFilter) : Promise<Reserva[]>
    {
        let url = `${this.endpoint}/busca`;
        return axios.post<Reserva[]>(url, filtro)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async inserir(item: Reserva) : Promise<Reserva>
    {
        let url = `${this.endpoint}/insere`;
        return axios.post<Reserva>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }

    public async atualizar(item: Reserva) : Promise<Reserva>
    {
        let url = `${this.endpoint}/atualiza`;
        return axios.put<Reserva>(url, item)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
    
    public async deletar(id: number) : Promise<Reserva>
    {
        let url = `${this.endpoint}/deleta/${id}`;
        return axios.delete<Reserva>(url)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
}