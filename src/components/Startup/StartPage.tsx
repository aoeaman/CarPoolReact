import * as React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../Dashboard/DashBoard';
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

