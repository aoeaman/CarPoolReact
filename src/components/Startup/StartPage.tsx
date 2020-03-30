import * as React from 'react';
import { Route,Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../Dashboard/DashBoard';
export default class StartPage extends React.Component{
    render() {
        return (
            <React.Fragment>
                <Route exact path='/' component={LoginForm} />
                <Route path='/Signup' component={SignupForm}></Route>
                <Route path='/Dashboard' component={Dashboard} />
            </React.Fragment>
            
        );
    }
}

