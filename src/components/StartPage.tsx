import * as React from 'react';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
                <HomeImage />
                <Route exact path='/Login' component={LoginForm}/>
                <Route exact path='/Signup' component={()=><SignupForm/>}></Route>
                
            </Router>
        );
    }
}
const HomeImage = () => {
    return (
        <div id='Home'></div>);
}
