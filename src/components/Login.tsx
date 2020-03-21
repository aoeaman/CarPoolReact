
import * as React from "react";
import LoginForm from "./LoginForm";

type myProps={
    isAuthenticated:boolean
}
export default class LoginComponent extends React.Component<myProps> {
    
    render() {
        return (
            <div id='Login'>
                <LoginForm isAuthenticated={this.props.isAuthenticated}/>
            </div>
        );
    }
}