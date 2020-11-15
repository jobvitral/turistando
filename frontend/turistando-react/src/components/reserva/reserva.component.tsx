import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { HelperSessao } from '../../helpers/helper-sessao';
import { GlobalService } from '../../services/global.service';
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
import '../../index.css';
import { Roteiro } from '../../models/roteiro';
import { Reserva } from '../../models/reserva';
import { Usuario } from '../../models/usuario';
import { RoteiroService } from '../../services/roteiro.service';
import { ReservaRoteiro } from '../../models/reserva-roteiro';
import { Card } from 'primereact/card';
import { UsuarioService } from '../../services/usuario.service';
import { Calendar } from 'primereact/calendar';
import { ReservaService } from '../../services/reserva.service';

const ReservaComponent: React.FC = () =>
{
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
    const [roteiro, setRoteiro] = useState<Roteiro>(new Roteiro(0));
    const [guia, setGuia] = useState<Usuario>(new Usuario());
    const [reserva, setReserva] = useState<Reserva>(new Reserva(sessao.Id, 0));

    //configura as alteracoes de estado
    useEffect(() => { carregaRoteiro(); },[]);
    useEffect(() => { carregaGuia(); },[roteiro]);
    useEffect(() => { inicializaReserva(); },[guia]);
    useEffect(() => { carregaFormulario(); },[reserva]);

    //metodo generico que atualiza o estado o objeto para todas as propriedades
    const atualizaState = (e: any) => 
    {
        const { name, value } = e.target
        setReserva({
            ...reserva, [name]: value
        });
    }

    // metodo que carrega o roteiro para edicao
    const carregaRoteiro = async () =>
    {
        try 
        {
            let id = Number.parseInt(history.location.pathname.replace('/reserva/', ''));
            
            if(id != 0)
            {
                //instancia o servico
                var service = new RoteiroService();

                //executa a consulta
                var response = await service.buscar(id);

                setRoteiro(response);
            }
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const carregaGuia = async () =>
    {
        try 
        {
            //instancia o servico
            var service = new UsuarioService();

            //executa a consulta
            var response = await service.buscar(roteiro.IdGuia);

            //altera o state
            if(response != null && response != undefined)
            {
                setGuia(response);
            } 
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const inicializaReserva = async () => 
    {
        if(roteiro != null)
        {
            let item = new Reserva(sessao.Id, guia.Id);
            item.ValorTotal = roteiro.Valor;

            //adiciona o roteiro na reserva
            let reservaRoteiro = new ReservaRoteiro(0, roteiro.Id);
            reservaRoteiro.Informacoes = '';
            reservaRoteiro.Valor = roteiro.Valor;
            item.ReservaRoteiros.push(reservaRoteiro);

            //atualiza o state
            setReserva(item);
        }
    }

    //valida o formulario
    const valida = (): HelperValidation => 
    {
        let validacao = new HelperValidation();
        
        //data
        if(!reserva.DataReserva)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe a data da reserva');
        }

        //horario
        if(!reserva.Horario)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe o horário da reserva');
        }

        //local
        if(!reserva.Local)
        {
            validacao.Valido = false;
            validacao.Erros.push('Informe o estado');
        }

        //valor
        if(reserva.ValorTotal === null)
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
            var service = new ReservaService();

            //executa a consulta
            var roteiros = await service.inserir(reserva);

            //altera o state
            if(roteiro != null && roteiro != undefined)
            {
                HelperDialog.alert('Sucesso', ['Reserva efetuada com sucesso'], EnumDialogType.Sucesso, () => {
                    history.push('/');
                });
            } 
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao incluir os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const onSalvar_Click = async () => 
    {
        let validacao = valida();

        console.log(roteiro.Tempo);

        if(validacao.Valido)
        {
            await insere();
        }
        else
        {
            HelperDialog.alert('Erro ao validar', validacao.Erros, EnumDialogType.Warning, null);
        }
    }

    const carregaFormulario = () => 
    {
        if(reserva.IdGuia != 0 && reserva.IdTurista != 0)
        {
            return <div>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="p-col-12">
                        <h3>Dados do Roteiro</h3>
                    </div>
                    <div className="p-col-12">
                        <Card className="ui-card-shadow p-p-2">
                            <div className="p-grid">
                                <div className="p-col-12 p-md-4">
                                    <img className="list-image" src={ HelperCommons.wwwHost() + '/assets/images/' + roteiro.Imagem }></img>
                                </div>
                                <div className="p-col-12 p-md-8">
                                    <label className="p-text-bold list-item-title">{ roteiro.Nome }</label>
                                    <div className="p-pt-2">
                                        <label className="p-text-bold p-pr-1">Localização:</label>
                                        <label>{ roteiro.Cidade } - { roteiro.Estado}</label>
                                    </div>
                                    <div className="p-pt-2">
                                        <label className="p-text-bold p-pr-1">Duração:</label>
                                        <label>{ roteiro.Tempo } horas</label>
                                    </div>
                                    <div className="p-pt-2">
                                        <label className="p-text-bold p-pr-1">Valor:</label>
                                        <label>R$ { roteiro.Valor.toFixed(2) }</label>
                                    </div>
                                    <div className="p-pt-2">
                                        <label>{ roteiro.Descricao }</label>
                                    </div>
                                </div>                   
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="p-col-12">
                    <div className="p-col-12">
                        <h3>Dados do Guia</h3>
                    </div>
                    <div className="p-col-12">
                        <Card className="ui-card-shadow p-p-2">
                            <div className="p-grid">
                                <div className="p-col-12">
                                    <h3>Dados do Guia</h3>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <img className="list-image" src={ HelperCommons.wwwHost() + '/assets/images/' + guia.Avatar }></img>
                                </div>
                                <div className="p-col-12 p-md-8">
                                    <label className="p-text-bold list-item-title">{ guia.Nome }</label>
                                    <div className="p-pt-2">
                                        <label className="p-text-bold p-pr-1">Veículo:</label>
                                        <label>{ guia.GuiaCarro } - { guia.GuiaPlaca}</label>
                                    </div>
                                    <div className="p-pt-2">
                                        <label className="p-text-bold p-pr-1">Horário de Trabalho:</label>
                                        <label>{ guia.GuiaHorario }</label>
                                    </div>
                                    <div className="p-pt-2">
                                        <label>{ guia.GuiaDetalhe }</label>
                                    </div>
                                </div>                   
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            

            <div className="p-fluid p-formgrid p-grid p-p-2">
                <div className="p-field p-col-12">
                    <h3>Informações da Reserva</h3>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Data da Reserva</label>
                    <Calendar key="cadastro-nascimento"
                                locale={HelperCommons.calendarLocale()}
                                dateFormat="dd/mm/yy"
                                value={ reserva.DataReserva }
                                name="DataReserva"
                                onChange={ atualizaState }></Calendar>
                </div>

                <div className="p-field p-col-12 p-md-8">
                    <label>Horário</label>
                    <InputText value={ reserva.Horario } name="Horario" onChange={ atualizaState } />
                </div>

                <div className="p-field p-col-12 p-md-8">
                    <label>Local</label>
                    <InputText value={ reserva.Local } name="Local" onChange={ atualizaState } />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Valor</label>
                    <InputNumber value={ reserva.ValorTotal } name="Valor" min={0} onValueChange={ atualizaState } mode="currency" currency="BRL" locale="pr-BR" />
                </div>

                <div className="p-field p-col-12">
                    <Button label="Salvar" onClick={ onSalvar_Click } className="p-button" />
                </div>
            </div>
        </div>
        }
    }

    return (
        <div>
            { carregaFormulario() }
        </div>
    );
}

export default ReservaComponent;