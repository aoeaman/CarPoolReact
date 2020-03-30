import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Header from './Header';
import { Redirect, Route, Link, Switch, NavLink } from 'react-router-dom';
import { Home } from './Home';
import NewRide from './NewRide/NewRide';
import NewOffer from './NewOffer/NewOffer';

interface myStates {
    isAuthenticated: boolean
    redirectTo: string
    User: object
}
export default class Dashboard extends React.Component<{}, myStates>{
    token: string;
    id: string
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false, redirectTo: '', User: null }
    }
    async UNSAFE_componentWillMount() {
        if (localStorage.getItem('Usertoken') == undefined) {
            this.setState({ isAuthenticated: false })
        }
        else {
            this.setState({ isAuthenticated: true })

            // this.token = localStorage.getItem('Usertoken');
            // console.log(this.token)

            // this.id = jwtDecode(this.token);
            // console.log(this.id['unique_name'])
        }
    }

    render() {
        if (this.state.isAuthenticated == false) {
            return <Redirect to='/Login'></Redirect>
        }
        return (
            <div id='Dashboard'>
                <Header />
                <div id='DashboardHome'>
                    <Switch>
                        <Route exact path='/Dashboard/NewBooking' component={(props) => <NewRide {...props} />} />
                        <Route exact path='/Dashboard/NewOffer' component={(props) => <NewOffer {...props} />} />
                        <Route exact path='/Dashboard' render={() => <Home />} />
                    </Switch>
                </div>
            </div>
        );
    }
}
