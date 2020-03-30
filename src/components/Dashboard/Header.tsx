import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    logout() {
        alert('Loging Out');
        localStorage.clear();
    }
    render() {

        return (
            <React.Fragment>
                <div id='Logo'></div>
                <UserOptions Logout={this.logout}/>
            </React.Fragment>
        );
    }
}
export const UserOptions = ({ Logout }) => {
    return (
        <React.Fragment>
            <div id='User_Name'>John Wills</div>
            <button id='DropDown'></button>
            <div id="Options">
                <Link to='/Profile'><div>Profile</div></Link>
                <Link to='/My Rides'><div>My Rides</div></Link>
                <Link to='/' onClick={Logout}><div>Logout</div></Link>
            </div>
        </React.Fragment>
    );
}