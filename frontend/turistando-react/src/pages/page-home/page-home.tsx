import React, {useEffect, useState} from 'react';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import MenuComponent from '../../components/menu/menu.component';
import '../../index.css';
import HomeComponent from '../../components/home/home.component';
import { HelperCommons } from '../../helpers/helper-commons';

const PageHome: React.FC = () => 
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
                    <HomeComponent></HomeComponent>
                </div>
            </div>
        </div>
	);
}

export default PageHome;