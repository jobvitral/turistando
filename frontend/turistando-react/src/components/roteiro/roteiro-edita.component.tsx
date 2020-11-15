import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { RoteiroFilter } from '../../filters/roteiro-filter';
import { HelperSessao } from '../../helpers/helper-sessao';
import { Roteiro } from '../../models/roteiro';
import { GlobalService } from '../../services/global.service';
import { RoteiroService } from '../../services/roteiro.service';
import '../../index.css';
import { HelperDialog } from '../../helpers/helper-dialog';
import { HelperValidation } from '../../helpers/helper-validation';
import { EnumDialogType } from '../../helpers/enum-dialog-type';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { HelperCommons } from '../../helpers/helper-commons';
import { Button } from 'primereact/button';
import { EnumTipoUsuario } from '../../helpers/enum-tipo-usuario';
import { UploadService } from '../../services/upload.service';

const RoteiroEditaComponent: React.FC = () => 
{
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
    const [roteiro, setRoteiro] = useState<Roteiro>(new Roteiro(sessao.Id));
    const [titulo, setTitulo] = useState<string>('Novo roteiro');
    const [id, setId] = useState<number>(0);

    useEffect(() => 
	{
        inicializa();
    },[]);

    //inicializa os dados
    const inicializa = async () => 
    {
        await carregaRoteiro();
    }

    //metodo generico que atualiza o estado o objeto para todas as propriedades
    const atualizaState = (e: any) => 
    {
        const { name, value } = e.target
        setRoteiro({
            ...roteiro, [name]: value
        });
    }

    // metodo que carrega o roteiro para edicao
    const carregaRoteiro = async () =>
    {
        try 
        {
            let id = Number.parseInt(history.location.pathname.replace('/roteiro/', ''));
            console.log(id);
            if(id != 0)
            {
                //instancia o servico
                var service = new RoteiroService();

                //executa a consulta
                var reponse = await service.buscar(id);

                //altera o state
                if(reponse != null && reponse != undefined)
                {
                    setRoteiro(reponse);
                    setTitulo('Editando registro');
                    setId(reponse.Id);
                }   
            }
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    //valida o formulario
    const valida = (): HelperValidation => 
    {
        let validacao = new HelperValidation();
        
        //nome
        if(!roteiro.Nome)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe o nome do roteiro');
        }

        //cidade
        if(!roteiro.Cidade)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe a cidade');
        }

        //estado
        if(!roteiro.Estado)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe o estado');
        }

        //duracao
        if(!roteiro.Tempo )
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe a duração do roteiro');
        }

        //valor
        if(roteiro.Valor === null)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe o valor');
        }

        return validacao;
    }

    // metodo que insere o registro no banco de dados
    const insere = async () =>
    {
        try 
        {
            //instancia o servico
            var service = new RoteiroService();

            //executa a consulta
            var roteiros = await service.inserir(roteiro);

            //altera o state
            if(roteiro != null && roteiro != undefined)
            {
                HelperDialog.alert('Sucesso', ['Roteiro incluido com sucesso'], EnumDialogType.Sucesso, () => {
                    history.push('/roteiro');
                });
            } 
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao incluir os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    // metodo que atualiza o registro no banco de dados
    const atualiza = async () =>
    {
        try 
        {
            //instancia o servico
            var service = new RoteiroService();

            //executa a consulta
            var roteiros = await service.atualizar(roteiro);

            //altera o state
            if(roteiro != null && roteiro != undefined)
            {
                HelperDialog.alert('Sucesso', ['Roteiro atualizado com sucesso'], EnumDialogType.Sucesso, () => {
                    history.push('/roteiro');
                });
            } 
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao atualizar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
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
                    atualizaState({
                        target: {
                            name: 'Imagem',
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

    //evento de selecao de imagem
    const onImage_Change = (e: any) => {
        let files = e.target.files;

        upload(files);
    }

    //evento de salvar
    const onSalvar_Click = async () => 
    {
        let validacao = valida();

        console.log(roteiro.Tempo);

        if(validacao.Valido)
        {
            if(id == 0)
                await insere();
            else
                await atualiza();
        }
        else
        {
            HelperDialog.alert('Erro ao validar', validacao.Erros, EnumDialogType.Warning, null);
        }

    }
    
	return (
		<div>
            <h2>{titulo}</h2>
            <div className="p-fluid p-formgrid p-grid p-p-2">
                <div className="p-field p-col-12 p-text-center">
                    <img className="form-image" src={ HelperCommons.wwwHost() + '/assets/images/thumbs/' + roteiro.Imagem }></img>
                </div>
                <div className="p-field p-col-12 p-text-center">
                    <input type="file" multiple={false} onChange={ onImage_Change } accept="image/*" />
                </div>
                
                <div className="p-field p-col-12">
                    <label>Nome do roteiro</label>
                    <InputText value={ roteiro.Nome } name="Nome" onChange={ atualizaState } />
                </div>

                <div className="p-field p-col-12 p-md-8">
                    <label>Cidade</label>
                    <InputText value={ roteiro.Cidade } name="Cidade" onChange={ atualizaState } />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Estado</label>
                    <InputText value={ roteiro.Estado } name="Estado" onChange={ atualizaState } />
                </div>

                <div className="p-field p-col-12 p-md-8">
                    <label>Duração em horas</label>
                    <InputNumber showButtons min={0} value={ roteiro.Tempo } name="Tempo" onValueChange={ atualizaState } />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Valor</label>
                    <InputNumber value={ roteiro.Valor } name="Valor" min={0} onValueChange={ atualizaState } mode="currency" currency="BRL" locale="pr-BR" />
                </div>

                <div className="p-field p-col-12">
                    <label>Descrição do roteiro</label>
                    <InputTextarea rows={5} value={ roteiro.Descricao } name="Descricao" onChange={ atualizaState } />
                </div>

                <div className="p-field p-col-12">
                    <Button label="Salvar" onClick={ onSalvar_Click } className="p-button" />
                </div>
            </div>
        </div>
	);
}

export default RoteiroEditaComponent;