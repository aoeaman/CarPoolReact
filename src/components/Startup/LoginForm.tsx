import * as React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import UserServices from '../../Services/Providers/UserService';
import TokenServices from "../../Services/Providers/TokenServices";

interface myState {
    Password: string
    PasswordHidden: boolean
    Email: string
    isAuthenticated: boolean
    isLoading:boolean
}

export default class LoginForm extends React.Component<{}, myState>{
    UserService:UserServices
    constructor(props) {
        super(props);
        this.state = { Password: '', Email: '', PasswordHidden: true, isAuthenticated: false,isLoading:false};
        this.UserService=new UserServices();
    }

    private onInput(evt:any):void {
        let value=evt.target.value
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    private async handleSubmit():Promise<void>{
        let token=await this.UserService.Login(this.state.Email,this.state.Password);
        if(token!=null){
            TokenServices.setToken(token);
        }
        <Redirect from='/' to='/Dashboard'></Redirect>
    }

    private showPassword():void {
        this.setState({ PasswordHidden: false });
    }
    private hidePassword():void {
        this.setState({ PasswordHidden: true });
    }

    render() {    
        if (TokenServices.getToken()){
            return <Redirect to='/Dashboard'></Redirect>
        }
        
        return (
            <React.Fragment>
                <div id='Home'></div>
                <div id='Login'>
                    <form id="LoginForm" onSubmit={this.handleSubmit.bind(this)}>
                        <div className='Form_Field'>
                            <label className='Form_Header'>L<label className="Underline">og I</label>n</label>
                        </div>
                        <div className='Form_Field'>
                            <input type='text' name='Email' id='Form_Input1' className='Form_Input'
                                onChange={this.onInput.bind(this)} placeholder="Enter Email Id"></input>

                            <label id='Form_Label1' className='Form_Label'>Enter Email Id</label>
                        </div>
                        <div className='Form_Field'>
                            <span className="field-icon" id='Eye' onMouseDown={this.showPassword.bind(this)} onMouseUp={this.hidePassword.bind(this)}></span>
                            <input type={this.state.PasswordHidden ? "password" : "text"} name='Password' id='Form_Input2' className='Form_Input'
                                onChange={this.onInput.bind(this)} placeholder="Enter Password" required></input>

                            <label id='Form_Label2' className='Form_Label'>Enter Password</label>
                        </div>

                        <div className='Form_Field'>
                            <button className='Login_Submit_Button' type='submit'>Submit</button>
                        </div>
                        <div className='Form_Field'>
                            <label id='Nav_Link' className='ms-fontColor-white'>Not a member yet ? <Link to='/Signup' className='ms-fontWeight-semibold ms-fontColor-white'><label className="Underline">SIGN </label>UP</Link></label>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }

}