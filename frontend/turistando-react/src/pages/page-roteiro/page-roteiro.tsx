import React, {useEffect, useState} from 'react';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import MenuComponent from '../../components/menu/menu.component';
import '../../index.css';
import RoteiroListaComponent from '../../components/roteiro/roteiro-lista.component';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

const PageRoteiro: React.FC = () => 
{
    const history = useHistory();
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());

    useEffect(() => 
	{
		GlobalService.verificaLogado();
    },[]);

    const onAdicionar_Click = () => 
    {
        history.push('/roteiro/0');
    }
    
	return (
		<div>
            <div className="page-background"></div>
            <MenuComponent></MenuComponent>

            <div className="page-container">
                <div className="page-content p-mb-2">
                    <div className="p-fluid">
                        <div className="p-col">
                            <Button label="Adicionar roteiro" onClick={ onAdicionar_Click } />
                        </div>
                    </div>
                </div>
                
                <div className="page-content">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <h3>Meus roteiros</h3>
                        </div>
                    </div>
                    
                    <RoteiroListaComponent actionEdita={true} actionExclui={true} actionReserva={false}></RoteiroListaComponent>
                </div>
            </div>
        </div>
	);
}

export default PageRoteiro;