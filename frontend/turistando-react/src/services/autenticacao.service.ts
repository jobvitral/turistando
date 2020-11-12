import {HelperCommons} from "../helpers/helper-commons";
import axios, {AxiosResponse} from "axios";
import {HelperLogin} from "../helpers/helper-login";
import {Usuario} from "../models/usuario";

export class AutenticacaoService
{
    private endpoint: string = HelperCommons.apiHost('autenticacao');

    public async login(loginModel: HelperLogin) : Promise<AxiosResponse<Usuario>>
    {
        let url = `${this.endpoint}/login`;
        let request = await axios.post<Usuario>(url, loginModel);

        return request;
    }
}
