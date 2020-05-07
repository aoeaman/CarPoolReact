import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import TokenServices from "../../../Services/Providers/TokenServices";
import User from "../../../Models/User";
import { UserService } from "../../../Context";

interface myStates {
    User: User
}
export default class Header extends React.Component<{}, myStates> {
    constructor(props) {
        super(props)
        this.logout.bind(this);
        this.state = { User:new User() }
    }
    private logout():void {
        alert('Loging Out');
        TokenServices.removeToken();
    }

    async UNSAFE_componentWillMount() {
        let User = (await UserService.getByID(TokenServices.getUserID()));
        this.setState({ User: User });
    }

    componentDidMount() {
        document.getElementById('Logo').addEventListener("click", () => {
            history.pushState(null, null, '/');
            window.location.reload();
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id='Logo'></div>
                <React.Fragment>
                    <div id='User_Name'>{this.state.User.name}</div>
                    <button style={{backgroundImage:`url(${this.state.User.profileImage})`}} id='DropDown'></button>
                    <div id="Options">
                        <Link to='/Dashboard/Profile'><div>Profile</div></Link>
                        <Link to='/Dashboard/MyRides'><div>My Rides</div></Link>
                        <Link to='/' onClick={() => this.logout()}><div>Logout</div></Link>
                    </div>
                </React.Fragment>
            </React.Fragment>
        );
    }
}