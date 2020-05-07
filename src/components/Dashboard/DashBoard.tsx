import * as React from 'react';
import Header from './Components/Header';
import { Redirect, Route, Switch, } from 'react-router';
import Home from './Home';
import NewRide from './NewRide';
import NewOffer from './NewOffer';
import User from '../../Models/User';
import TokenServices from '../../Services/Providers/TokenServices';
import MyRides from './MyRides';
import Profile from './Profile';

interface myStates {
    isAuthenticated: boolean
}
export default class Dashboard extends React.Component<{}, myStates>{
    token: string;
    id: string
    user: User
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false}
    }

    async UNSAFE_componentWillMount() {
        if (TokenServices.getToken() == undefined) {
            this.setState({ isAuthenticated: false })
        }
        else {
            this.setState({ isAuthenticated: true })
        }
    }

    render() {
        if (this.state.isAuthenticated == false) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <div id='Dashboard'>
                <Header/>
                <Switch>
                    <Route exact path='/Dashboard'><Home/></Route>
                    <Route path='/Dashboard/Profile' component={Profile} />
                    <Route path='/Dashboard/MyRides' component={MyRides}/>
                    <Route path='/Dashboard/NewBooking' component={NewRide} />
                    <Route path='/Dashboard/NewOffer' component={NewOffer} />
                </Switch>
            </div>
        );
    }
}
