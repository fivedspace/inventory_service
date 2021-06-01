import React from 'react';
import ReactDOM from 'react-dom';
import Home from './View/Home'
import { createBrowserHistory } from "history";
import {BrowserRouter, Redirect, Route, Router, Switch} from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist} >
    {/*<Router >*/}
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={Home} />
                <Redirect from="/" to="/admin/AllEchart" />
            </Switch>
        </BrowserRouter>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

