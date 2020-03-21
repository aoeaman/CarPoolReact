import * as React from 'react';
import { Switch, Route, Router } from 'react-router';
import LoginComponent from './Login';
import SignupComponent from './Signup';
import { createBrowserHistory } from 'history';
import LoginForm from './LoginForm';
const history = createBrowserHistory();

type myState={
    isAuthenticated:boolean
}
export default class StartPage extends React.Component<{},myState>{
    constructor(props){
        super(props)
        this.state={isAuthenticated:false}
    }
    render() {
        return (
            <Router history={history}>
                <HomeImage />
                <Route exact path='/Login' render={(props)=><LoginComponent {...props} isAuthenticated={this.state.isAuthenticated}/>}/>
                <Route exact path='/Signup' render={()=><SignupComponent/>}></Route>

            </Router>
        );
    }
}
const HomeImage = () => {
    return (
        <div id='Home'></div>);
}
