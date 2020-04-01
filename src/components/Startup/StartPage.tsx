import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../Dashboard/DashBoard';
import NewRide from '../../components/Dashboard/NewRide/NewRide';
export default class StartPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route exact path='/' component={LoginForm} />
                    <Route path='/Signup' component={SignupForm}></Route>
                    <Route eaxct path='/Dashboard' component={Dashboard} />
                </React.Fragment>
            </BrowserRouter>

        );
    }
}

