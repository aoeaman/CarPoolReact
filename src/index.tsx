import * as React from "react";
import * as ReactDOM from "react-dom";
import './Index.scss';
import './components/Dashboard/Dashboard.scss';
import './components/Startup/Startup.scss';
import StartPage from "./components/Startup/StartPage";
import { Router } from "react-router";
import {createBrowserHistory } from 'history';
const history=createBrowserHistory();

ReactDOM.render(<Router history={history}><StartPage /></Router> ,document.getElementById("Root"));