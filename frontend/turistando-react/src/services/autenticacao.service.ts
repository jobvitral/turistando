import {HelperCommons} from "../helpers/helper-commons";
import axios, {AxiosResponse} from "axios";
import {HelperLogin} from "../helpers/helper-login";
import {Usuario} from "../models/usuario";
import {Simulate} from "react-dom/test-utils";
import {HelperValidation} from "../helpers/helper-validation";

export class AutenticacaoService
{
    private endpoint: string = HelperCommons.apiHost('autenticacao');

    public async login(loginModel: HelperLogin) : Promise<Usuario>
    {
        let url = `${this.endpoint}/login`;

        return axios.post<Usuario>(url, loginModel)
                    .then((response) =>
                    {
                        if(response.status === 200) {
                            return response.data;
                        }
                        else
                        {
                            const error = 'Não foi encontrado nenhum registro com esse email e senha';
                            return Promise.reject(HelperValidation.setError(error));
                        }
                    })
                    .catch((error: HelperValidation) => {
                        return Promise.reject(error);
                    });
    }
}
