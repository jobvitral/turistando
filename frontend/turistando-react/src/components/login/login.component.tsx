import React, {ChangeEvent, FC, useImperativeHandle, useState} from 'react';
import {HelperLogin} from "../../helpers/helper-login";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import './login.component.style.css'
import {Card} from "primereact/card";
import {LoginComponentProperties} from "./login.component.properties";
import {LoginComponentController} from "./login.component.controller";
import {HelperDialog} from "../../helpers/helper-dialog";
import {EnumDialogType} from "../../helpers/enum-dialog-type";
import {useHistory} from "react-router-dom";

export const LoginComponent: FC<LoginComponentProperties> = (props) =>
{
    //router
    const history = useHistory();

    // objeto do viewmodel
    const [login, setLogin] = useState<HelperLogin>({
        Email: props.email !== undefined ? props.email : '',
        Senha: props.senha !== undefined ? props.senha : ''
    });

    //controller
    const controller = new LoginComponentController(login);

    // eventos
    const onLogin_Click = async () =>
    {
        let validacao = controller.valida();

        if(validacao.Valido)
        {
            await controller.efetuaLogin();
            history.push('/');
        }
        else
        {
            HelperDialog.alert('Erro ao validar os dados', validacao.Erros, EnumDialogType.Erro, null);
        }
    }

    const onCadastro_Click = () =>
    {
        history.push('/cadastro');
    }

    return(
        <div className="login-component">

            <Card>
                <div className="p-fluid">
                    <div className="p-field">
                        <img src={'assets/images/logo.png'}/>
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText value={ login.Email } onChange={(e:ChangeEvent<HTMLInputElement>) => setLogin({...login, Email: e.target.value})} />
                    </div>
                    <div className="p-field">
                        <label>Senha</label>
                        <InputText type="password" value={ login.Senha } onChange={(e:ChangeEvent<HTMLInputElement>) => setLogin({...login, Senha: e.target.value})} />
                    </div>
                    <div className="p-field">
                        <Button label="Login" onClick={ onLogin_Click } />
                    </div>
                    <div className="p-field">
                        <hr />
                    </div>
                    <div className="p-field">
                        <Button label="Cadastrar" onClick={ onCadastro_Click } className="p-button-secondary" />
                    </div>
                </div>
            </Card>
        </div>
    )
}
