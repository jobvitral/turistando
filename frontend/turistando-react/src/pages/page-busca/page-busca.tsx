import React, {useEffect, useState} from 'react';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import MenuComponent from '../../components/menu/menu.component';
import '../../index.css';
import BuscaComponent from '../../components/busca/busca.component';
import { HelperCommons } from '../../helpers/helper-commons';
import { HelperValidation } from '../../helpers/helper-validation';

const PageBusca: React.FC = () => 
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
                            <h3>Busca</h3>
                        </div>
                    </div>
                    
                    <BuscaComponent></BuscaComponent>
                </div>
            </div>
        </div>
	);
}

export default PageBusca;