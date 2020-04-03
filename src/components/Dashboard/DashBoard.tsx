import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Header from './Header';
import { Redirect, Route, Switch, } from 'react-router';
import { Home } from './Home';
import NewRide from './NewRide/NewRide';
import NewOffer from './NewOffer/NewOffer';
import UserServices from '../../Services/UserService'
import User from '../../Models/User';

interface myStates {
    isAuthenticated: boolean
    redirectTo: string
    User: User
}
export default class Dashboard extends React.Component<{}, myStates>{
    token: string;
    id: string
    UserService: UserServices
    user: User
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false, redirectTo: '', User: new User() }
        this.UserService = new UserServices();
    }

    async UNSAFE_componentWillMount() {
        if (localStorage.getItem('Usertoken') == undefined) {
            this.setState({ isAuthenticated: false })
        }
        else {
            this.setState({ isAuthenticated: true })
            this.token = localStorage.getItem('Usertoken');
            this.id = jwtDecode(this.token)['unique_name'];
            this.user = await this.UserService.getUserByID(this.id);
            console.log(this.user);
            this.setState({ User: this.user })
        }
    }

    render() {
        if (this.state.isAuthenticated == false) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <div id='Dashboard'>
                <Header User={this.state.User} />
                <div id='DashboardHome'>
                    <Switch>
                        <Route path='/Dashboard/NewBooking' component={NewRide} />
                        <Route path='/Dashboard/NewOffer' component={NewOffer} />
                        <Route exact path='/Dashboard' component={Home} />
                    </Switch>
                </div>
            </div>
        );
    }
}
