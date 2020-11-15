import React, {useEffect, useState} from 'react';
import {HelperLogin} from "../../helpers/helper-login";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {HelperDialog} from "../../helpers/helper-dialog";
import {EnumDialogType} from "../../helpers/enum-dialog-type";
import {useHistory} from "react-router-dom";
import { AutenticacaoService } from '../../services/autenticacao.service';
import { GlobalService } from '../../services/global.service';
import { HelperValidation } from '../../helpers/helper-validation';
import '../../index.css';

export const LoginComponent: React.FC = () =>
{
    //declara os objetos
    const history = useHistory();
    const [login, setLogin] = useState<HelperLogin>(new HelperLogin());
    
    //utiliza o hook para inicializa os objeto apos a renderizacao
    useEffect(() =>
    {
        inicializa();
    }, []);

    // metodo de inicializacao do estado do objeto login
    const inicializa = async () => {
        setLogin({
            Email: '',
            Senha: ''
        });
    }

    //metodo generico que atualiza o estado o objeto para todas as propriedades
    const atualizaEstado = (e: any) => {
        const { name, value } = e.target
        setLogin({
            ...login, [name]: value
        })
    }

    const efetuaLogin = async (callback: any): Promise<void> => 
    {
        let service = new AutenticacaoService();

        // faz a consulta
        service
            .login(login)
            .then((result) =>
            {
                //salva a sessao
                GlobalService.setSessao(result);

                //executa o callback
                callback();
            })
            .catch((error: HelperValidation) =>
            {
                console.log(error);
                HelperDialog.alert('Erro ao efetuar o login', error.Erros, EnumDialogType.Erro, null);
            })
    }

    const valida = (): HelperValidation =>
    {
        let validation = new HelperValidation();

        // verifica se email
        if(!login.Email)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o email acesso');
        }
        else
        {
            // valida o email
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(re.test(String(login.Email).trim().toLowerCase()) === false)
            {
                validation.Valido = false;
                validation.Erros.push('Informe um email válido');
            }
        }

        // verifica a senha
        if(!login.Senha)
        {
            validation.Valido = false;
            validation.Erros.push('Informe uma senha de acesso');
        }

        return validation;
    }

    // eventos
    const onLogin_Click = async () =>
    {
        //executa a validacao dos campos
        let validacao = valida();

        if(validacao.Valido)
        {
            //configura o metodo de retorno em caso de sucesso
            const successCallback = () => history.push('/');

            //efetua o login
            await efetuaLogin(successCallback);
        }
        else
        {
            HelperDialog.alert('Erro ao validar os dados', validacao.Erros, EnumDialogType.Erro, null);
        }
    }

    const onCadastro_Click = () =>
    {
        //redireciona para o cadastro
        history.push('/cadastro');
    }

    return(
        <div className="login-component">

            <Card>
                <div className="p-fluid">
                    <div className="p-field">
                        <img src={'assets/images/logo.png'} alt="Turistando"/>
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText name="Email" value={ login.Email } onChange={ atualizaEstado } />
                    </div>
                    <div className="p-field">
                        <label>Senha</label>
                        <InputText type="password" name="Senha" value={ login.Senha } onChange={ atualizaEstado } />
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
