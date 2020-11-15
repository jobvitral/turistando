import React from 'react';
import { LoginComponent } from "../../components/login/login.component";
import '../../index.css';

const PageLogin: React.FC = () => 
{
    return (
        <div className="page-login">
            <div className="page-login-background"></div>
            <div className="p-d-flex p-jc-center page-login-container">
                <div className="p-mr-2 p-as-center p-shadow-24">
                    <LoginComponent></LoginComponent>
                </div>
            </div>
        </div>
	);
}

export default PageLogin;