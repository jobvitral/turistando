import React, {useEffect, useState} from 'react';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import MenuComponent from '../../components/menu/menu.component';
import '../../index.css';
import ReservaComponent from '../../components/reserva/reserva.component';
import { HelperCommons } from '../../helpers/helper-commons';

const PageReserva: React.FC = () => 
{
    const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());

    useEffect(() => 
	{
        HelperCommons.goTop();
		GlobalService.verificaLogado();
    },[]);
    
	return (
		<div>
            <div className="page-background"></div>
            <MenuComponent></MenuComponent>

            <div className="page-container">
                <div className="page-content">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <h3>Fazer Reserva</h3>
                        </div>
                    </div>
                    
                    <ReservaComponent></ReservaComponent>
                </div>
            </div>
        </div>
	);
}

export default PageReserva;