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
import PageReserva from './pages/page-reserva/page-reserva';
import PageRoteiro from './pages/page-roteiro/page-roteiro';
import PageRoteiroEdita from './pages/page-roteiro/page-roteiro-edita';
import PageBusca from './pages/page-busca/page-busca';
import PageUsuario from './pages/page-usuario/page-usuario';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={PageHome}></Route>
                <Route exact path="/login" component={PageLogin}></Route>
                <Route exact path="/cadastro" component={PageCadastro}></Route>
                <Route exact path="/reserva/:id" component={PageReserva}></Route>
                <Route exact path="/roteiro" component={PageRoteiro}></Route>
                <Route exact path="/roteiro/:id" component={PageRoteiroEdita}></Route>
                <Route exact path="/busca" component={PageBusca}></Route>
                <Route exact path="/usuario" component={PageUsuario}></Route>
            </Switch>
        </Router>
    );
}

export default App;
