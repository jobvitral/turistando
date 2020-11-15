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
import { HelperSessao } from '../../helpers/helper-sessao';
import { UploadService } from '../../services/upload.service';

export const UsuarioComponent: React.FC = () =>
{
    // inicializa os hooks
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
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
        await carregaUsuario();
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

    const carregaUsuario = async () => 
    {
        let service = new UsuarioService();

        try 
        {
            let result = await service.buscar(sessao.Id);
            
            if(result != null)
            {
                result.DataNascimento = new Date(result.DataNascimento.toString());
                setUsuario(result);
            }
        }
        catch(error: any) 
        {
            HelperDialog.alert('Erro ao cadastrar', error.Erros, EnumDialogType.Erro, null);
        }
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

            //carrega somente registro ignorando o usuario atual
            let lista = response.filter(a => a.Id != sessao.Id);

            if(lista.length > 0)
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
            .atualizar(usuario)
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

    //faz upload da imagem
    const upload = async (files: any) => {
        if (files.length > 0)
        {
            // pega o arquivo
            const file = files.item(0);

            // cria o form
            const formData = new FormData();
            formData.append('file', file, file.name);

            try 
            {
                // faz o upload
                let service = new UploadService();
                let response = await service.enviaImagem(formData);

                //verifica se retorno imagem
                if(response.length > 0)
                {
                    //atualiza o estado da imagem
                    const imagem = response[0];

                    //atualiza o state
                    usuarioChange({
                        target: {
                            name: 'Avatar',
                            value: imagem
                        }
                    });
                }
            } 
            catch (error) 
            {
                HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
            }
        }
    }

    // eventos
    const onImage_Change = (e: any) => {
        let files = e.target.files;

        upload(files);
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
                    const title = 'Cadastro atualizado';
                    const message = 'Dados atualizados com sucesso';
                    
                    HelperDialog.alert(title, [message], EnumDialogType.Sucesso, null);
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

    const onLogout_Click = () => 
    {
        GlobalService.closeSessao();
    }

    return(
        <div className="cadastro-component">
            <Card>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-text-center">
                        <img className="form-image" src={ HelperCommons.wwwHost() + '/assets/images/thumbs/' + usuario.Avatar }></img>
                    </div>
                    <div className="p-field p-col-12 p-text-center">
                        <input type="file" multiple={false} onChange={ onImage_Change } accept="image/*" />
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
                </div>

                <div className="p-fluid p-mt-4 ">
                    <div className="p-d-md-flex p-jc-md-between">
                        <div className="p-mb-4">
                            <Button label="Atualizar Cadastro" onClick={ onCadastrar_Click } icon="pi pi-check" className="p-button"  />
                        </div>

                        <div>
                            <Button label="Sair do sistema" onClick={ onLogout_Click } icon="pi pi-times" className="p-button p-button-danger" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
