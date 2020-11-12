import React, {ChangeEvent, FC, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CadastroComponentProperties} from "./cadastro.component.properties";
import {Usuario} from "../../models/usuario";
import {CadastroComponentController} from "./cadastro.component.controller";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import "./cadastro.component.style.css"
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

export const CadastroComponent: FC<CadastroComponentProperties> = (props) =>
{
    //router
    const history = useHistory();

    // objeto do viewmodel
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [tiposCadastro, setTipoCadastro] = useState<SelectItem[]>([
        {label: 'Guia', value: EnumTipoUsuario.Guia},
        {label: 'Turista', value: EnumTipoUsuario.Turista}
    ]);
    const [tiposSexo, setTipoSexo] = useState<SelectItem[]>([
        {label: 'Masculino', value: 'M'},
        {label: 'Feminino', value: 'F'}
    ]);

    //controller
    const controller = new CadastroComponentController(usuario, confirmaSenha);

    // eventos
    const onCancelar_Click = () => {
        history.push('/login');
    }

    const onCadastrar_Click = async () => {
        let validacao = controller.valida();

        if(validacao.Valido)
        {
            let filtro = new UsuarioFilter();
            filtro.Email = usuario.Email.trim();

            let validaExiste = await controller.validaUsuarioExiste();

            if(validaExiste)
            {
                await controller.efetuaCadastro();

                HelperDialog.alert('Cadastro efetuado',
                    ['Obrigado por cadastrar. Utilize o email e a senha cadastrada para entrar no sistems'],
                    EnumDialogType.Sucesso, () => {
                        history.push('/login');
                    });
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
                        <img src={'assets/images/logo.png'} className="cadastro-component-logo"/>
                    </div>

                    <div className="p-field p-col-12">
                        <h2>Faça o seu cadastro</h2>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Tipo de Cadastro</label>
                        <Dropdown value={ usuario.Tipo }
                                  options={ tiposCadastro }
                                  onChange={(e) => setUsuario({...usuario, Tipo: e.target.value})}
                                  placeholder="Selecione o tipo de cadastro"/>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Sexo</label>
                        <Dropdown value={ usuario.Sexo }
                                  options={ tiposSexo }
                                  onChange={(e) => setUsuario({...usuario, Sexo: e.target.value})}
                                  placeholder="Selecione o sexo"/>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Nome Completo</label>
                        <InputText value={ usuario.Nome }
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, Nome: e.target.value})} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Data de Nascimento</label>
                        <Calendar key="cadastro-nascimento"
                                  locale={HelperCommons.calendarLocale()}
                                  dateFormat="dd/mm/yy"
                                  value={ usuario.DataNascimento } onChange={(e) => setUsuario({...usuario, DataNascimento: e.value})}></Calendar>
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Cidade</label>
                        <InputText value={ usuario.Cidade }
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, Cidade: e.target.value})} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Estado</label>
                        <InputText value={ usuario.Estado }
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, Estado: e.target.value})} />
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label>Email</label>
                        <InputText value={ usuario.Email }
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, Email: e.target.value})} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Telefone</label>
                        <InputMask mask="(99) 99999-9999"
                                   value={ usuario.Telefone }
                                   onChange={(e) => setUsuario({...usuario, Telefone: e.target.value})}></InputMask>
                    </div>

                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Modelo do Veículo</label>
                            <InputText value={usuario.GuiaCarro}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, GuiaCarro: e.target.value })}/>
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Placa do Veículo</label>
                            <InputText value={ usuario.GuiaPlaca }
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, GuiaPlaca: e.target.value})} />
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12 p-md-4">
                            <label>Hórario de Trabalho</label>
                            <InputText value={ usuario.GuiaHorario }
                                       onChange={(e:ChangeEvent<HTMLInputElement>) => setUsuario({...usuario, GuiaHorario: e.target.value})} />
                        </div>
                    }
                    {
                        usuario.Tipo === EnumTipoUsuario.Guia &&
                        <div className="p-field p-col-12">
                            <label>Informações adicionais</label>
                            <InputTextarea rows={5}
                                           value={ usuario.GuiaDetalhe }
                                           onChange={(e:any) => setUsuario({...usuario, GuiaDetalhe: e.target.value})}
                                           autoResize></InputTextarea>
                        </div>
                    }

                    <div className="p-field p-col-12 p-pt-2 p-pb-2">
                        <hr/>
                    </div>

                    <div className="p-field p-col-12 p-md-6">
                        <label>Informe a senha</label>
                        <Password value={ usuario.Senha }
                                  onChange={(e:any) => setUsuario({...usuario, Senha: e.target.value})}></Password>
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
