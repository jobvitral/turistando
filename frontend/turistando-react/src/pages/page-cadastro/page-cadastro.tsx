import React, {ChangeEvent, Component} from 'react';
import './page-cadastro.css';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {CadastroComponent} from "../../components/cadastro/cadastro.component";

class PageCadastro extends Component
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return(
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
}

export default PageCadastro
