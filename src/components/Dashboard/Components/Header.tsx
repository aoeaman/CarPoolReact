import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import TokenServices from "../../../Services/Providers/TokenServices";
import User from "../../../Models/User";
import UserServices from "../../../Services/Providers/UserService";

interface myStates {
    User: User
}
export default class Header extends React.Component<{}, myStates> {
    UserService:UserServices
    constructor(props) {
        super(props)
        this.state = { User:new User() }
        this.UserService=new UserServices();
        this.logout.bind(this);
    }
    
    private logout():void {
        alert('Loging Out');
        TokenServices.removeToken();
    }

    async UNSAFE_componentWillMount() {
        let User = (await this.UserService.getByID(TokenServices.getUserID()));
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