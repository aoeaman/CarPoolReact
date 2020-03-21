import * as React from "react";
import User from "./Models/User";
import StartPage from "./components/StartPage";
import { Router } from "react-router";
import { createBrowserHistory } from 'history';
const history=createBrowserHistory();
type State ={
    user: User;
  }
export default class App extends React.Component<{},State>{
    constructor(props){
        super(props);
        this.state=({user:new User()})
    }
    
    // async componentDidMount(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ "Username":"first11",    "Password":"zig"})
    //     };
    //     fetch('https://localhost:5001/api/user/Login',requestOptions).then(res => res.json()).then((data) => {
    //         this.setState({user:data})
    //         }).catch(console.log);
    // }
    render(){
        // let user:User=this.state.user;
        return(
        // <div>{JSON.stringify(user)}</div>
        <Router history={history}>
        <StartPage/>
        </Router>

        );
    }
}