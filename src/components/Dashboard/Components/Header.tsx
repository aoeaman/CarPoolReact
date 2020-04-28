import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import User from "../../../Models/User";
import TokenServices from "../../../Services/TokenServices";
import UserServices from "../../../Services/UserService";

interface myStates {
    Name: string
}

export default class Header extends React.Component<{}, myStates> {
    UserService: UserServices;
    constructor(props) {
        super(props)
        this.logout.bind(this);
        this.state = { Name: '' }
        this.UserService=new UserServices();
    }
    logout() {
        alert('Loging Out');
        TokenServices.removeToken();
    }
    async UNSAFE_componentWillMount() {
        let name=(await this.UserService.getByID(TokenServices.getUserID())).name;
        this.setState({ Name:name})  ;
    }
    componentDidMount(){
        document.getElementById('Logo').addEventListener("click",()=>{history.pushState(null,null,'/');
        window.location.reload();})
    }
    render() {
        return (
            <React.Fragment>
                <div id='Logo'></div>
                {/* <UserOptions Logout={this.logout} Name={this.state.Name} /> */}
                <React.Fragment>
            <div id='User_Name'>{this.state.Name}</div>
            <button id='DropDown'></button>
            <div id="Options">
                <Link to='/Profile'><div>Profile</div></Link>
                <Link to='/Dashboard/MyRides'><div>My Rides</div></Link>
                <Link to='/' onClick={()=>this.logout()}><div>Logout</div></Link>
            </div>
        </React.Fragment>
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
                <Link to='/MyRides'><div>My Rides</div></Link>
                <Link to='/' onClick={Logout}><div>Logout</div></Link>
            </div>
        </React.Fragment>
    );
}