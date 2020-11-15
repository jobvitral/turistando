import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { RoteiroFilter } from '../../filters/roteiro-filter';
import { EnumDialogType } from '../../helpers/enum-dialog-type';
import { HelperCommons } from '../../helpers/helper-commons';
import { HelperDialog } from '../../helpers/helper-dialog';
import { HelperSessao } from '../../helpers/helper-sessao';
import { HelperValidation } from '../../helpers/helper-validation';
import { Roteiro } from '../../models/roteiro';
import { GlobalService } from '../../services/global.service';
import { RoteiroService } from '../../services/roteiro.service';
import '../../index.css';
import { Reserva } from '../../models/reserva';
import { ReservaFilter } from '../../filters/reserva-filter';
import { EnumTipoUsuario } from '../../helpers/enum-tipo-usuario';
import { ReservaService } from '../../services/reserva.service';

const HomeComponent: React.FC = () => 
{
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [titulo, setTitulo] = useState<string>('');

    useEffect(() => {
        inicializa();
    },[]);

    const inicializa = async () => {
        await carregaReservas();
    }

    const carregaReservas = async () =>
    {
        try 
        {
            //configura os filtro
            var filter = new ReservaFilter();

            if(sessao.Tipo == EnumTipoUsuario.Guia)
            {
                filter.Guia = sessao.Id;
                setTitulo('Trabalhos solicitados')
            }

            if(sessao.Tipo == EnumTipoUsuario.Turista)
            {
                filter.Turista = sessao.Id;
                setTitulo('Reservas efetuadas');
            }

            //instancia o servico
            var service = new ReservaService();

            //executa a consulta
            var reservas = await service.listar(filter);

            //altera o state
            if(reservas != null && reservas != undefined)
                setReservas(reservas);
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const atualizaReserva = async (reserva: Reserva) => {
        try 
        {
            //instancia o servico
            var service = new ReservaService();

            //executa a consulta
            var response = await service.atualizar(reserva);

            //altera o state
            if(response != null && response != undefined)
            {
                HelperDialog.alert('Sucesso', ['Reserva avaliada com sucesso'], EnumDialogType.Sucesso, () => {
                    carregaReservas();
                });
            }
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const deletaReserva = async (reserva: Reserva) => {
        try 
        {
            //instancia o servico
            var service = new ReservaService();

            //executa a consulta
            var response = await service.deletar(reserva.Id);

            //altera o state
            if(response != null && response != undefined)
            {
                HelperDialog.alert('Sucesso', ['Reserva excluida com sucesso'], EnumDialogType.Sucesso, () => {
                    carregaReservas();
                });
            }
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const carregaResultado = () => 
    {
        if(reservas.length == 0)
        {
            return(<div className="p-col-12">Nenhum {titulo} encontrado</div>);
        }
        else
        {
            return(reservas.map((value, index) => 
            (
                <div key={index} className="p-col-12">
                    <Card className="ui-card-shadow p-p-2">
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <img className="list-image" src={ HelperCommons.wwwHost() + '/assets/images/' + value.ReservaRoteiros[0].Roteiro.Imagem }></img>
                            </div>
                            <div className="p-col-12 p-md-8">
                                <label className="p-text-bold list-item-title">{ value.ReservaRoteiros[0].Roteiro.Nome }</label>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Localização:</label>
                                    <label>{ value.ReservaRoteiros[0].Roteiro.Cidade } - { value.ReservaRoteiros[0].Roteiro.Estado}</label>
                                </div>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Data:</label>
                                    <label>{ HelperCommons.getDateString(value.DataReserva) }</label>
                                </div>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Horário:</label>
                                    <label>{ value.Horario }</label>
                                </div>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Local:</label>
                                    <label>{ value.Local }</label>
                                </div>
                                {
                                    sessao.Tipo === EnumTipoUsuario.Turista &&
                                    <div>
                                        <div className="p-pt-2">
                                            <label className="p-text-bold p-pr-1">Guia:</label>
                                            <label>{ value.Guia.Nome }</label>
                                        </div>
                                        <div className="p-pt-2">
                                            <label className="p-text-bold p-pr-1">Veículo:</label>
                                            <label>{ value.Guia.GuiaCarro } - { value.Guia.GuiaPlaca }</label>
                                        </div>
                                        <div className="p-pt-2">
                                            <label className="p-text-bold p-pr-1">Valor:</label>
                                            <label>R$ { value.ValorTotal.toFixed(2) }</label>
                                        </div>
                                    </div>
                                }
                                {
                                    sessao.Tipo === EnumTipoUsuario.Guia &&
                                    <div>
                                        <div className="p-pt-2">
                                            <label className="p-text-bold p-pr-1">Turista:</label>
                                            <label>{ value.Turista.Nome }</label>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            <div className="p-col-12 p-md-4 p-fluid">
                                <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" onClick={ (e) => onDeleta_Click(value)} />
                            </div>                           
                        </div>
                    </Card>
                </div>
            )));
        }
    }

    const onDeleta_Click = async (reserva: Reserva) => {
        const title = 'Confirmação';
        const message = `Tem certeza que deseja excluir a reserva ${reserva.ReservaRoteiros[0].Roteiro.Nome}?`

        HelperDialog.confirm(title, message, async() => {
            await deletaReserva(reserva);
        }, null);
    }

    return (
        <div className="p-grid p-align-stretch">
            <div className="p-col-12">
                <h2>{titulo}</h2>
            </div>
            { carregaResultado() }
        </div>
	);
}

export default HomeComponent;