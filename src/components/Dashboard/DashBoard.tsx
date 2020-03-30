import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Logo from './Logo';
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
        this.logout.bind(this);
    }
    async UNSAFE_componentWillMount() {
        if (localStorage.getItem('Usertoken') == undefined) {
            this.setState({ isAuthenticated: false })
        }
        else {
            this.setState({ isAuthenticated: true })
            this.token = localStorage.getItem('Usertoken');
            console.log(this.token)

            this.id = jwtDecode(this.token);
            console.log(this.id['unique_name'])
        }
    }
    logout = (e) => {
        alert('Loging Out');
        this.setState({ isAuthenticated: false });
        localStorage.clear();
    }
    render() {
        if (this.state.isAuthenticated == false) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <div id='Dashboard'>
                <Logo />
                
                    <div id='User_Name'>John Wills</div>
                    <button id='DropDown'>
                    </button>
                    <div id="Options">
                        <Link to='/Profile'><div>Profile</div></Link>
                        <Link to='/My Rides'><div>My Rides</div></Link>
                        <Link to='/Login' onClick={this.logout}><div>Logout</div></Link>
                    </div>
                    <div id='DashboardHome'>
                <Switch>
                <Route path='/NewBooking' component={NewRide} />
                <Route path='/NewOffer'><NewOffer/></Route>
                <Route path='/Dashboard'><Home/></Route>
                </Switch>
                </div>
            </div>
        );
    }
}