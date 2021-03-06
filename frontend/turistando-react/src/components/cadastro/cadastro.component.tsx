import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Usuario} from "../../models/usuario";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {SelectItem} from "primereact/api";
import {EnumTipoUsuario} from "../../helpers/enum-tipo-usuario";
import {HelperCommons} from "../../helpers/helper-commons";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {InputMask} from "primereact/inputmask";
import {InputTextarea} from "primereact/inputtextarea";
import {Password} from "primereact/password";
import {HelperDialog} from "../../helpers/helper-dialog";
import {EnumDialogType} from "../../helpers/enum-dialog-type";
import {UsuarioFilter} from "../../filters/usuario-filter";
import { UsuarioService } from '../../services/usuario.service';
import { HelperValidation } from '../../helpers/helper-validation';
import { GlobalService } from '../../services/global.service';
import "../../index.css";

export const CadastroComponent: React.FC = () =>
{
    // inicializa os hooks
    const history = useHistory();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [tiposCadastro, setTipoCadastro] = useState<SelectItem[]>([]);
    const [tiposSexo, setTipoSexo] = useState<SelectItem[]>([]);

    // metodo generico de atualizacao do
    const usuarioChange = (e: any) => {
        const { name, value } = e.target;
        setUsuario({...usuario, [name]: value})
    }

    // inicializa
    useEffect(() =>
    {
        inicializa().then(() => console.log('iniciado'));
    },[]);

    const inicializa = async () =>
    {
        await carregaListaCadastro();
        await carregaListaSexo();
    }

    const carregaListaSexo = async () => {
        let tiposSexo = new Array<SelectItem>();
        tiposSexo.push({label: 'Masculino', value: 'M'});
        tiposSexo.push({label: 'Feminino', value: 'F'});

        setTipoSexo(tiposSexo);
    }

    const carregaListaCadastro = async () => {
        let tiposCadastro = new Array<SelectItem>();
        tiposCadastro.push({label: 'Guia', value: EnumTipoUsuario.Guia});
        tiposCadastro.push({label: 'Turista', value: EnumTipoUsuario.Turista});

        setTipoCadastro(tiposCadastro);
    }

    const valida = (): HelperValidation =>
    {
        let validation = new HelperValidation();

        // verifica o nome
        if(!usuario.Nome)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o nome completo');
        }

        // verifica o tipo
        if(usuario.Tipo !== EnumTipoUsuario.Guia && usuario.Tipo !== EnumTipoUsuario.Turista)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o tipo de cadastro');
        }

        // verifica o Data Nascimento
        if(!usuario.DataNascimento)
        {
            validation.Valido = false;
            validation.Erros.push('Informe a data de nascimento');
        }

        // verifica o telefone
        if(!usuario.Telefone)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o telefone');
        }

        // verifica se email
        if(!usuario.Email)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o email acesso');
        }
        else
        {
            // valida o email
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(re.test(String(usuario.Email).trim().toLowerCase()) === false)
            {
                validation.Valido = false;
                validation.Erros.push('Informe um email válido');
            }
        }

        // verifica a senha
        if(!usuario.Senha)
        {
            validation.Valido = false;
            validation.Erros.push('Informe uma senha de acesso');
        }

        // verifica a confirmacao da senha
        if(!confirmaSenha)
        {
            validation.Valido = false;
            validation.Erros.push('Informe um connfirmação da senha');
        }

        if(usuario.Senha !== confirmaSenha)
        {
            validation.Valido = false;
            validation.Erros.push('Confirmação de senha inválida');
        }

        // validacoes especificas de guia
        if(usuario.Tipo === EnumTipoUsuario.Guia)
        {
            // verifica o carro
            if(!usuario.GuiaCarro)
            {
                validation.Valido = false;
                validation.Erros.push('Informe o modelo do carro');
            }

            // verifica o placa
            if(!usuario.GuiaPlaca)
            {
                validation.Valido = false;
                validation.Erros.push('Informe a placa do carro');
            }

            // verifica o horario
            if(!usuario.GuiaHorario)
            {
                validation.Valido = false;
                validation.Erros.push('Informe o horário de trabalho');
            }
        }

        return validation;
    }

    const validaUsuarioExiste = async(): Promise<boolean> =>
    {
        let isValido = true;
        let filtro = new UsuarioFilter();
        filtro.Email = usuario.Email;

        let service = new UsuarioService();

        // verifica se email ja esta cadastrado
        try 
        {
            var response = await service.listar(filtro);
            
            if(response.length > 0)
                isValido = false;
            else
                isValido = true;
        } 
        catch (error)
        {
            isValido = false;
        }

        return isValido;
    }

    const efetuaCadastro = async (sucessCallback: any): Promise<void> =>
    {
        let service = new UsuarioService();

        // insere no banco de dados
        service
            .inserir(usuario)
            .then((result) =>
            {
                // salva o login
                GlobalService.setSessao(result);

                //executa operacao de sucesso
                if(sucessCallback != null)
                    sucessCallback(result);
            })
            .catch((error: HelperValidation) => {
                HelperDialog.alert('Erro ao cadastrar', error.Erros, EnumDialogType.Erro, null);
            });
    }

    // eventos
    const onCancelar_Click = () => {
        history.push('/login');
    }

    const onEmail_Change = async () => {
        if(usuario.Email.trim())
        {
            let filtro = new UsuarioFilter();
            filtro.Email = usuario.Email.trim();

            let validaExiste = await validaUsuarioExiste();
            console.log(usuario.Email.trim());
            if(validaExiste == false)
            {
                HelperDialog.alert('Erro ao validar', ['Já existem um usuario cadastrado com esse email'], EnumDialogType.Erro, null);
            }
        }
    }

    const onCadastrar_Click = async () => {
        let validacao = valida();

        if(validacao.Valido)
        {
            let filtro = new UsuarioFilter();
            filtro.Email = usuario.Email.trim();

            let validaExiste = await validaUsuarioExiste();

            if(validaExiste)
            {
                const successCallback = (result: Usuario) =>
                {
                    const title = 'Cadastro efetuado';
                    const message = 'Obrigado por cadastrar. Utilize o email e a senha cadastrada para entrar no sistems';
                    const callback = () => { history.push('/login') };

                    HelperDialog.alert(title, [message], EnumDialogType.Sucesso, callback);
                }

                //efetua o cadastro
                await efetuaCadastro(successCallback);
            }
            else
            {
                HelperDialog.alert('Erro ao cadastrar', ['Já existem um usuario cadastrado com esse email'], EnumDialogType.Erro, null);
            }
        }
        else
        {
            HelperDialog.alert('Erro ao validar os dados', validacao.Erros, EnumDialogType.Erro, null);
        }
    }

    return(
        <div className="cadastro-component">
            <Card>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-text-center">
                        <img src={'assets/images/logo.png'} className="cadastro-component-logo" alt="Turistando"/>
                    </div>

                    <div className="p-field p-col-12">
                        <h2>Faça o seu cadastro</h2>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Tipo de Cadastro</label>
                        <Dropdown value={ usuario.Tipo }
                                  options={ tiposCadastro }
                                  onChange={ usuarioChange }
                                  name="Tipo"
                                  placeholder="Selecione o tipo de cadastro"/>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Sexo</label>
                        <Dropdown value={ usuario.Sexo }
                                  options={ tiposSexo }
                                  name="Sexo"
                                  onChange={ usuarioChange }
                                  placeholder="Selecione o sexo"/>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Nome Completo</label>
                        <InputText value={ usuario.Nome }
                                   name="Nome"
                                   onChange={ usuarioChange } />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Data de Nascimento</label>
                        <Calendar key="cadastro-nascimento"
                                  locale={HelperCommons.calendarLocale()}
                                  dateFormat="dd/mm/yy"
                                  value={ usuario.DataNascimento }
                                  name="DataNascimento"
                                  onChange={ usuarioChange }></Calendar>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Cidade</label>
                        <InputText value={ usuario.Cidade }
                                   name="Cidade"
                                   onChange={ usuarioChange } />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Estado</label>
                        <InputText value={ usuario.Estado }
                                   name="Estado"
                                   onChange={ usuarioChange } />
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Email</label>
                        <InputText value={ usuario.Email }
                                   name="Email"
                                   onChange={ usuarioChange }
                                   onBlur={ onEmail_Change } />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Telefone</label>
                        <InputMask mask="(99) 99999-9999"
                                   value={ usuario.Telefone }
                                   name="Telefone"
                                   onChange={ usuarioChange }></InputMask>
                    </div>

                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Modelo do Veículo</label>
                            <InputText value={usuario.GuiaCarro}
                                       name="GuiaCarro"
                                       onChange={ usuarioChange }/>
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Placa do Veículo</label>
                            <InputText value={ usuario.GuiaPlaca }
                                       name="GuiaPlaca"
                                       onChange={ usuarioChange } />
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Hórario de Trabalho</label>
                            <InputText value={ usuario.GuiaHorario }
                                       name="GuiaHorario"
                                       onChange={ usuarioChange } />
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12">
                            <label>Informações adicionais</label>
                            <InputTextarea rows={5}
                                           value={ usuario.GuiaDetalhe }
                                           name="GuiaDetalhe"
                                           onChange={ usuarioChange }
                                           autoResize></InputTextarea>
                        </div>
                    }

                    <div className="p-field p-col-12 p-pt-2 p-pb-2">
                        <hr/>
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <label>Informe a senha</label>
                        <Password value={ usuario.Senha }
                                  name="Senha"
                                  onChange={ usuarioChange }></Password>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Confirme a senha</label>
                        <InputText type="password"
                                   value={ confirmaSenha }
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => setConfirmaSenha(e.target.value)} />
                    </div>
                </div>

                <div className="p-fluid p-mt-4 ">
                    <div className="p-field p-d-md-none">
                        <Button label="Cadastrar" onClick={ onCadastrar_Click } className="p-button" />
                    </div>

                    <div className="p-d-md-flex p-jc-md-between p-d-none">
                        <div>
                            <Button label="Cancelar" onClick={ onCancelar_Click } icon="pi pi-times" className="p-button-text" />
                        </div>
                        <div>
                            <Button label="Cadastrar" onClick={ onCadastrar_Click } icon="pi pi-check" className="p-button"  />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
