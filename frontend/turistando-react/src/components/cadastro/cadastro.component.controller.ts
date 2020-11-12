import {HelperValidation} from "../../helpers/helper-validation";
import {CadastroComponentInterface} from "./cadastro.component.interface";
import {Usuario} from "../../models/usuario";
import {EnumTipoUsuario} from "../../helpers/enum-tipo-usuario";
import {UsuarioService} from "../../services/usuario.service";
import {GlobalService} from "../../services/global.service";
import {HelperDialog} from "../../helpers/helper-dialog";
import {EnumDialogType} from "../../helpers/enum-dialog-type";
import {UsuarioFilter} from "../../filters/usuario-filter";

export class CadastroComponentController implements CadastroComponentInterface
{
    private usuario: Usuario;
    private confirma: string;

    constructor(pUsuario: Usuario, pConfirmaSenha: string)
    {
        this.usuario = pUsuario != null || undefined ? pUsuario : new Usuario();
        this.confirma = pConfirmaSenha;
    }

    public valida(): HelperValidation
    {
        let validation = new HelperValidation();

        // verifica o nome
        if(!this.usuario.Nome)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o nome completo');
        }

        // verifica o tipo
        if(this.usuario.Tipo !== EnumTipoUsuario.Guia && this.usuario.Tipo !== EnumTipoUsuario.Turista)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o tipo de cadastro');
        }

        // verifica o Data Nascimento
        if(!this.usuario.DataNascimento)
        {
            validation.Valido = false;
            validation.Erros.push('Informe a data de nascimento');
        }

        // verifica o telefone
        if(!this.usuario.Telefone)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o telefone');
        }

        // verifica se email
        if(!this.usuario.Email)
        {
            validation.Valido = false;
            validation.Erros.push('Informe o email acesso');
        }
        else
        {
            // valida o email
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(re.test(String(this.usuario.Email).toLowerCase()) === false)
            {
                validation.Valido = false;
                validation.Erros.push('Informe um email válido');
            }
        }

        // verifica a senha
        if(!this.usuario.Senha)
        {
            validation.Valido = false;
            validation.Erros.push('Informe uma senha de acesso');
        }

        // verifica a confirmacao da senha
        if(!this.confirma)
        {
            validation.Valido = false;
            validation.Erros.push('Informe um connfirmação da senha');
        }

        if(this.usuario.Senha !== this.confirma)
        {
            validation.Valido = false;
            validation.Erros.push('Confirmação de senha inválida');
        }

        // validacoes especificas de guia
        if(this.usuario.Tipo === EnumTipoUsuario.Guia)
        {
            // verifica o carro
            if(!this.usuario.GuiaCarro)
            {
                validation.Valido = false;
                validation.Erros.push('Informe o modelo do carro');
            }

            // verifica o placa
            if(!this.usuario.GuiaPlaca)
            {
                validation.Valido = false;
                validation.Erros.push('Informe a placa do carro');
            }

            // verifica o horario
            if(!this.usuario.GuiaHorario)
            {
                validation.Valido = false;
                validation.Erros.push('Informe o horário de trabalho');
            }
        }

        return validation;
    }

    public async validaUsuarioExiste(): Promise<boolean>
    {
        let isValido = true;
        let filtro = new UsuarioFilter();
        filtro.Email = this.usuario.Email;

        let service = new UsuarioService();

        // insere no banco de dados
        let response = await service.lista(filtro);

        // verifica o retorno
        if(response.status == 200)
        {
            if(response.data.length > 0)
            {
                isValido = false;
            }
        }

        return isValido;
    }

    public async efetuaCadastro(): Promise<void>
    {
        let service = new UsuarioService();

        // insere no banco de dados
        let response = await service.insere(this.usuario);

        // verifica o retorno
        if(response.status == 200)
        {
            // salva o login
            GlobalService.setSessao(response.data);
        }
        else
        {
            let errorMessage: any = response.data;
            HelperDialog.alert('Erro ao cadastrar', errorMessage.Erros, EnumDialogType.Erro, null);
        }
    }

    public async uploadImage(): Promise<string> {
        return Promise.resolve("");
    }
}
