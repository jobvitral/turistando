import React, {Component} from 'react';
import { LoginComponent } from "../../components/login/login.component";
import {HelperLogin} from "../../helpers/helper-login";
import './page-login.css';

class PageLogin extends Component
{
    public state: HelperLogin;
    public updateModel: any;

    constructor(props: any) {
        super(props);

        this.state = new HelperLogin()
    }

    public onUpdate(result: HelperLogin): void{
        this.setState(result);
    }

    render()
    {
        this.updateModel = (result: HelperLogin) => {
            this.setState(result);
        }

        return(
            <div className="page-login">
                <div className="page-login-background"></div>
                <div className="p-d-flex p-jc-center page-login-container">
                    <div className="p-mr-2 p-as-center p-shadow-24">
                        <LoginComponent updateState={this.updateModel}></LoginComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageLogin
