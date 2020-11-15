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

export interface IRoteiroListaComponent
{
    actionEdita: boolean;
    actionExclui: boolean;
    actionReserva: boolean;
}

const RoteiroListaComponent: React.FC<IRoteiroListaComponent> = (props: IRoteiroListaComponent) => 
{
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
    const [roteiros, setRoteiros] = useState<Roteiro[]>([]);

    useEffect(() => {
        inicializa();
    },[]);

    const inicializa = async () => {
        await carregaRoteiros();
    }

    const carregaRoteiros = async () =>
    {
        try 
        {
            //configura os filtro
            var filter = new RoteiroFilter();
            filter.Guias = [ sessao.Id ];

            //instancia o servico
            var service = new RoteiroService();

            //executa a consulta
            var roteiros = await service.listar(filter);

            //altera o state
            if(roteiros != null && roteiros != undefined)
                setRoteiros(roteiros);
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const deletaRoteiro = async (roteiro: Roteiro) => {
        try 
        {
            //instancia o servico
            var service = new RoteiroService();

            //executa a consulta
            var response = await service.deletar(roteiro.Id);

            //altera o state
            if(response != null && response != undefined)
                carregaRoteiros();
        } 
        catch (error) 
        {
            HelperDialog.alert('Erro ao carregar os dados', (error as HelperValidation).Erros, EnumDialogType.Erro, null);
        }
    }

    const carregaResultado = () => {
        if(roteiros.length == 0)
        {
            return(<div className="p-col-12">Nenhum registro encontrado</div>);
        }
        else
        {
            return(roteiros.map((value, index) => 
            (
                <div key={index} className="p-col-12">
                    <Card className="ui-card-shadow p-p-2">
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <img className="list-image" src={ HelperCommons.wwwHost() + '/assets/images/' + value.Imagem }></img>
                            </div>
                            <div className="p-col-12 p-md-8">
                                <label className="p-text-bold list-item-title">{value.Nome}</label>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Localização:</label>
                                    <label>{ value.Cidade } - { value.Estado}</label>
                                </div>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Duração:</label>
                                    <label>{ value.Tempo } horas</label>
                                </div>
                                <div className="p-pt-2">
                                    <label className="p-text-bold p-pr-1">Valor:</label>
                                    <label>R$ { value.Valor.toFixed(2) }</label>
                                </div>
                                <div className="p-pt-2">
                                    <label>{ value.Descricao }</label>
                                </div>
                            </div>
                            {
                                props.actionEdita === true && 
                                    <div className="p-col-12 p-md-4 p-fluid">
                                        <Button label="Alterar registro" icon="pi pi-pencil" onClick={ (e) => onEdita_Click(value) } />
                                    </div>
                            }
                            { 
                                props.actionExclui === true &&
                                    <div className="p-col-12 p-md-4 p-fluid">
                                        <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" onClick={ (e) => onDeleta_Click(value)} />
                                    </div>
                            }
                            {
                                props.actionReserva === true &&
                                    <div className="p-col-12 p-md-4 p-fluid">
                                        <Button label="Fazer reserva" icon="pi pi-check-circle" className="p-button-success" onClick={ (e) => onReserva_Click(value)} />
                                    </div>
                            }                            
                        </div>
                    </Card>
                </div>
            )));
        }
    }

    const onEdita_Click = (roteiro: Roteiro) => {
        history.push('/roteiro/' + roteiro.Id)
    }

    const onDeleta_Click = async (roteiro: Roteiro) => {
        const title = 'Confirmação';
        const message = `Tem certeza que deseja excluir o roteiro ${roteiro.Nome}?`

        HelperDialog.confirm(title, message, async() => {
            await deletaRoteiro(roteiro);
        }, null);
    }

    const onReserva_Click = (roteiro: Roteiro) => 
    {
        history.push('/reserva/' + roteiro.Id)
    }
    
	return (
        <div className="p-grid p-align-stretch">
        { carregaResultado() }
        </div>
	);
}

export default RoteiroListaComponent;