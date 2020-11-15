import React, {useEffect, useState} from 'react';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import MenuComponent from '../../components/menu/menu.component';
import '../../index.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RoteiroEditaComponent from '../../components/roteiro/roteiro-edita.component';
import { HelperCommons } from '../../helpers/helper-commons';

const PageRoteiroEdita: React.FC = () => 
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
                    <RoteiroEditaComponent></RoteiroEditaComponent>
                </div>
            </div>
        </div>
	);
}

export default PageRoteiroEdita;