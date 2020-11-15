import {HelperCommons} from "../helpers/helper-commons";
import axios from "axios";
import {Usuario} from "../models/usuario";
import {UsuarioFilter} from "../filters/usuario-filter";
import {HelperValidation} from "../helpers/helper-validation";

export class UploadService
{
    private endpoint: string = HelperCommons.apiHost('upload');

    public async enviaImagem(formData: FormData) : Promise<string[]>
    {
        let url = `${this.endpoint}/imagem`;
        return axios.post<string[]>(url, formData)
                    .then((response) => (response.data))
                    .catch((error: HelperValidation) => (Promise.reject(error)));
    }
}