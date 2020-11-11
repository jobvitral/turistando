import React, {Component} from 'react';
import './page-home.css';
import {HelperSessao} from "../../helpers/helper-sessao";
import {GlobalService} from "../../services/global.service";
import {Button} from "primereact/button";

class PageHome extends Component
{
    private sessao: HelperSessao;

    constructor(props: any)
    {
        super(props);

        GlobalService.verificaLogado();
        this.sessao = GlobalService.getSessao();
    }

    render()
    {
        const onLogout_Click = () => {
            GlobalService.closeSessao();
        }

        return(
            <div className="page-home p-text-center">
                <h1>Pagina Inicial</h1>
                <p>{this.sessao.Nome} - {this.sessao.Email}</p>
                <Button label='Sair' onClick={onLogout_Click}></Button>
            </div>
        );
    }
}

export default PageHome
