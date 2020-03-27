import * as React from 'react';
var jwtDecode = require('jwt-decode');
import Logo from './Logo';
import { Redirect, Route, Link, Switch, NavLink } from 'react-router-dom';

interface myStates {
    isAuthenticated: boolean
    redirectTo: string
    User:object
}
export default class Dashboard extends React.Component<{}, myStates>{
    token:string;
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false, redirectTo: '',User:null }
        //this.token=jwtDecode(localStorage.getItem('Usertoken'));
        console.log(this.token)
    }
    async componentWillMount() {
        if (localStorage.getItem('Usertoken') == undefined) {
            this.setState({ isAuthenticated: false })
        }
        else {
            this.setState({ isAuthenticated: true })
        }
    }
    logout=(e)=>{
        alert('Loging Out');
        localStorage.clear();
        this.setState({isAuthenticated:false});
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
                        <Link to='/Login'  onClick={this.logout}><div>Logout</div></Link>
                    </div>
                </React.Fragment>
                <Switch>
                    <Home/>
                    <Route exact path='/Dashboard/NewBooking' />
                </Switch>
            </div>
        );
    }
}

export function Home(){
    return(
        <div id='DashboardHome'>

            <Link to='/Dashboard/NewBooking' className='ms-bgColor-purple ms-bgColor-themeLight DashboardNavs'><div id='New_Booking'>Book A Ride</div></Link>
            <Link to='/Dashboard/NewOffer' className='ms-bgColor-yellow ms-bgColor-themeLighterAlt DashboardNavs'><div id='New_offer'>Offer A Ride</div></Link>
        </div>
    );
}