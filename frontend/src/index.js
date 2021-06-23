import React from 'react';
import ReactDOM from 'react-dom';
import Home from './View/Home'
import { createBrowserHistory } from "history";
import {BrowserRouter, Redirect, Route, Router, Switch} from "react-router-dom";
import Cookie from 'react-cookies';
import toSignIn from "./util/toSignIn/toSignIn";
import config from 'config/config.json'

const hist = createBrowserHistory();
console.log("111")
let token = window.location.pathname.substring(17,window.location.pathname.length);
document.cookie="token=" + token + ";path=/"
const toke = Cookie.load("token")
// document.cookie="token=token;path=/"


// toSignIn(document.location.href, config.callbackUrl, config.publicKey, config.singleUrl)

ReactDOM.render(
    <Router history={hist} >
        {!toke ? toSignIn(document.location.href, config.callbackUrl, config.publicKey, config.singleUrl) :
            <BrowserRouter>
                {console.log("首页")}
            <Switch>
                <Route path="/admin" component={Home} />
                <Redirect from="/" to="/admin/AllEchart" />
            </Switch>
        </BrowserRouter>
        }

    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

