import * as React from "react";
import { Link } from "react-router-dom";
import User from "../../Models/User";

interface myProps {
    User: User
}
interface myStates {
    Name: string
}

export default class Header extends React.Component<myProps, myStates> {
    constructor(props) {
        super(props)
        this.logout.bind(this);
        this.state = { Name: '' }
    }
    logout() {
        alert('Loging Out');
        localStorage.clear();
    }
    componentWillReceiveProps(prevProps) {
        this.setState({ Name: prevProps.User.name })
    }
    render() {
        return (
            <React.Fragment>
                <div id='Logo'></div>
                <UserOptions Logout={this.logout} Name={this.state.Name} />
            </React.Fragment>
        );
    }
}
export const UserOptions = ({ Logout, Name }) => {
    return (
        <React.Fragment>
            <div id='User_Name'>{Name}</div>
            <button id='DropDown'></button>
            <div id="Options">
                <Link to='/Profile'><div>Profile</div></Link>
                <Link to='/My Rides'><div>My Rides</div></Link>
                <Link to='/' onClick={Logout}><div>Logout</div></Link>
            </div>
        </React.Fragment>
    );
}