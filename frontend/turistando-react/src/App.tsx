import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PageLogin from "./pages/page-login/page-login";
import PageHome from "./pages/page-home/page-home";
import PageCadastro from "./pages/page-cadastro/page-cadastro";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={PageHome}></Route>
                <Route exact path="/login" component={PageLogin}></Route>
                <Route exact path="/cadastro" component={PageCadastro}></Route>
            </Switch>
        </Router>
    );
}

export default App;
