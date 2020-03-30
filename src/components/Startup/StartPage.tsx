import * as React from 'react';
import { Route,Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../Dashboard/DashBoard';
export default class StartPage extends React.Component{
    render() {
        return (
            <Switch>
                <Route exact path='/Login' component={LoginForm} />
                <Route exact path='/Signup' component={SignupForm}></Route>
                <Route exact path='/Dashboard' component={Dashboard} />
            </Switch>
        );
    }
}

