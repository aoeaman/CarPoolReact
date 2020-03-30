import * as React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

export default class NewRide extends React.Component {
    logout = (e) => {
        alert('Loging Out');
        this.setState({ isAuthenticated: false });
        localStorage.clear();
    }
    render() {
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
                        <Link to='/Login' onClick={this.logout.bind(this)}><div>Logout</div></Link>
                    </div>
                </React.Fragment>
                <div id='DashboardHome'>
                    
                </div>
            </div>
    );
    }
}