import * as React from 'React';
import Logo from './Logo';
import { Redirect, Route, Link, Switch, NavLink } from 'react-router-dom';

interface myStates {
    isAuthenticated: boolean
    redirectTo: string
}
export default class Dashboard extends React.Component<{}, myStates>{
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false, redirectTo: '' }
    }
    componentWillMount() {
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
                    <span id='User_Name'>John Wills</span>
                    <button id='DropDown'>
                    </button>
                    <ul id="Options">
                        <Link to='/Dashboard/Profile'><li>Profile</li></Link>
                        <Link to='/Dashboard/My Rides'><li>My Rides</li></Link>
                        <Link to='/Login'  onClick={this.logout}><li>Logout</li></Link>
                    </ul>
                </React.Fragment>
                <Switch>

                </Switch>
            </div>
        );
    }
}