import React, { useEffect } from 'react';
import {CadastroComponent} from "../../components/cadastro/cadastro.component";
import { HelperCommons } from '../../helpers/helper-commons';
import '../../index.css';

const PageCadastro: React.FC = () => 
{
    useEffect(() => 
	{
        HelperCommons.goTop();
    },[]);
    
    return (
        <div className="page-cadastro">
            <div className="page-cadastro-background"></div>
            <div className="page-cadastro-container">
                <div className="page-cadastro-form">
                    <CadastroComponent></CadastroComponent>
                </div>

            </div>

        </div>
	);
}

export default PageCadastro;