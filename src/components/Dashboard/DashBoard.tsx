import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Header from './Header';
import { Redirect, Route, Switch, } from 'react-router';
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
                        {/* <Route path='/Dashboard/NewBooking' component={NewRide} /> */}
                        <Route path='/Dashboard/NewOffer' component={NewOffer} />
                        <Route exact path='/Dashboard' component={Home} />
                    </Switch>
                </div>
            </div>
        );
    }
}
