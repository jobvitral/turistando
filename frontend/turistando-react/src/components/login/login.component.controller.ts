import {LoginComponentInterface} from "./login.component.interface";
import {HelperLogin} from "../../helpers/helper-login";
import {HelperValidation} from "../../helpers/helper-validation";
import {AutenticacaoService} from "../../services/autenticacao.service";
import {GlobalService} from "../../services/global.service";
import {HelperDialog} from "../../helpers/helper-dialog";
import {EnumDialogType} from "../../helpers/enum-dialog-type";
import { useHistory } from "react-router-dom";


export class LoginComponentController implements LoginComponentInterface
{
    private login: HelperLogin;

    constructor(pLogin: HelperLogin) {
        this.login = pLogin != null || undefined ? pLogin : new HelperLogin();
    }

    public async efetuaLogin(): Promise<void>
    {
        let service = new AutenticacaoService();

        // faz a consulta
        let response = await service.login(this.login);

        // verifica o retorno
        if(response.status == 200)
        {
            console.log(response.data);
            // salva o login
            GlobalService.setSessao(response.data);
        }
        else
        {
            if(response.status == 204)
            {
                HelperDialog.alert('Erro ao efetuar o login', ['Nenhum usuário encontrado com esse email e senha'], EnumDialogType.Erro, null);
            }
            else
            {
                HelperDialog.alert('Erro ao efetuar o login', [response.statusText], EnumDialogType.Erro, null);
            }
        }
    }

    public valida(): HelperValidation
    {
        let validation = new HelperValidation();

        // verifica se email
        if(!this.login.Email)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o email acesso');
        }
        else
        {
            // valida o email
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(re.test(String(this.login.Email).toLowerCase()) === false)
            {
                validation.Valido = false;
                validation.Erros.push('Informe um email válido');
            }
        }

        // verifica a senha
        if(!this.login.Senha)
        {
            validation.Valido = false;
            validation.Erros.push('Informe uma senha de acesso');
        }

        return validation;
    }
}
