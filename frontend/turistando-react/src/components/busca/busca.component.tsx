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
import { InputText } from 'primereact/inputtext';

const BuscaComponent: React.FC = () => 
{
    const history = useHistory();
    const [busca, setBusca] = useState<string>('');
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
            filter.Nome = busca;

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
                                    <label className="p-text-bold p-pr-1">Guia:</label>
                                    <label>{ value.Guia.Nome }</label>
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
                                    <label>R$ { value.Descricao }</label>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4 p-fluid">
                                <Button label="Fazer reserva" icon="pi pi-check-circle" className="p-button-success" onClick={ (e) => onReserva_Click(value)} />
                            </div>
                        </div>
                    </Card>
                </div>
            )));
        }
    }

    const onBusca_Click = () => 
    {
        carregaRoteiros();
    }

    const onReserva_Click = (roteiro: Roteiro) => 
    {
        history.push('/reserva/' + roteiro.Id)
    }
    
	return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-10">
                    <InputText value={ busca } name="Nome" onChange={ (e: any) => setBusca(e.target.value) } placeholder="Informe o nome ou cidade do roteiro"/>
                </div>
                <div className="p-field p-col-12 p-md-2">
                    <Button label="Consultar" onClick={ onBusca_Click } icon="pi pi-filter" className="p-button"  />
                </div>
            </div>

            <div className="p-grid p-align-stretch">
                { carregaResultado() }
            </div>
        </div>
        
	);
}

export default BuscaComponent;