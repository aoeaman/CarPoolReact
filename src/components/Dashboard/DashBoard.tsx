import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Logo from './Logo';
import { Redirect, Route, Link, Switch, NavLink } from 'react-router-dom';
import NewRide from './NewRide/NewRide';
import NewOffer from './NewOffer/NewOffer';
import { Home } from './Home';

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
            return <Redirect to='/Login'></Redirect>
        }
        return (
            <div id='Dashboard'>
                <Logo />
                <React.Fragment>
                    <div id='User_Name'>John Wills</div>
                    <button id='DropDown'>
                    </button>
                    <div id="Options">
                        <Link to='/Dashboard/Profile'><div>Profile</div></Link>
                        <Link to='/Dashboard/My Rides'><div>My Rides</div></Link>
                        <Link to='/Login' onClick={this.logout}><div>Logout</div></Link>
                    </div>
                </React.Fragment>
                <Switch>
                    
                    <Route path='/Dashboard/NewBooking' component={NewRide} />
                    <Route path='/Dashboard/NewOffer' component={NewOffer} />
                    <Route exact path='/Dashboard' component={Home}/>
                </Switch>
            </div>
        );
    }
}