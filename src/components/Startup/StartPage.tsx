import * as React from 'react';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../Dashboard/DashBoard';

type myState={
    match:any
}
export default class StartPage extends React.Component<{},myState>{
    constructor(props){
        super(props);
        this.state={match:history};
    }
    render() {
        return (
            <Router>
                <Route exact path='/Login' component={LoginForm}/>
                <Route exact path='/Signup' component={()=><SignupForm/>}></Route>
                <Route exact path='/Dashboard' component={()=><Dashboard/>}/>
            </Router>
        );
    }
}

