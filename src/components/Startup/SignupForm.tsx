import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from '../../Services/UserService';
import $ from 'jquery';

interface myState {
    Name: string
    Username: string
    Password: string
    PasswordHidden: boolean
    Email: string
    ConfirmPassword: string
    isSuccessful: boolean
}
export default class SignupForm extends Component<{}, myState> {
    Service: UserService
    constructor(props) {
        super(props);
        this.state = {
            Name: '', Username: '', Password: '', PasswordHidden: true,
            Email: '', ConfirmPassword: '', isSuccessful: false
        }
        this.Service = new UserService();
    }
    onInput(evt) {
        let value=evt.target.value
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    IsEmptyInputs(){
        let fields=[this.state.Name,this.state.Email,this.state.Password,this.state.Username]
        for (var x in fields){
            if(x==''){
                alert(x+' is Empty')
                return true;
            }
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        try {
            if (this.state.Password == this.state.ConfirmPassword) {
                var id = await this.Service.Signup(this.state.Name,this.state.Username,this.state.Email,this.state.Password);
                alert("Signup Successful \nUserID is " + id+'\nProceed to Login');
                history.pushState(null, null, '/');
            }
            else {
                alert("Passwords Do Not Match");
            }
        } catch (e) {
            alert("Username Already Exists");
        }
        finally {
            window.location.reload(false);
        }
    }
    showPassword() {
        this.setState({ PasswordHidden: false });
    }
    hidePassword() {
        this.setState({ PasswordHidden: true });
    }
    render() {
        return (
            <Fragment>
                <div id='Home'></div>
                <div id='Signup'>
                    <form id="SignupForm" onSubmit={this.handleSubmit.bind(this)}>
                        <div className='Form_Field'>
                            <label className='Form_Header'>S<label className="Underline">ign U</label>p</label>
                        </div>
                        <div className='Form_Field'>
                            <input type='text' name='Name' className='Form_Input'
                                value={this.state.Name}
                                onChange={this.onInput.bind(this)} required placeholder="Name"></input>
                            <label className='Form_Label'>Name</label>
                        </div>
                        <div className='Form_Field'>
                            <input type='text' name='Username' className='Form_Input'
                                onChange={this.onInput.bind(this)} required placeholder="Username"
                                value={this.state.Username}></input>
                            <label className='Form_Label'>Username</label>
                        </div>
                        <div className='Form_Field'>
                            <input type='text' name='Email' className='Form_Input'
                                value={this.state.Email}
                                onChange={this.onInput.bind(this)} required placeholder="Enter Email Id"></input>
                            <label className='Form_Label'>Enter Email Id</label>
                        </div>
                        <div className='Form_Field'>
                            <span className="field-icon" id='Eye' onMouseDown={this.showPassword.bind(this)} onMouseUp={this.hidePassword.bind(this)}></span>
                            <input type={this.state.PasswordHidden ? "password" : "text"} name='Password' className='Form_Input'
                                onChange={this.onInput.bind(this)} placeholder="Enter Password" 
                                value={this.state.Password} required></input>

                            <label className='Form_Label'>Enter Password</label>
                        </div>
                        <div className='Form_Field'>
                            <input type="password" name='ConfirmPassword' className='Form_Input'
                                onChange={this.onInput.bind(this)} required value={this.state.ConfirmPassword} placeholder="Confirm Password"></input>

                            <label className='Form_Label'>Confirm Password</label>
                        </div>
                        <div className='Form_Field'>
                            <button className='Signup_Submit_Button' type='submit'>Submit</button>
                        </div>
                        <div className='Form_Field'>
                            <label id='Nav_Link' className='ms-fontColor-white'>Already a Member? <Link to='/' className='ms-fontWeight-semibold ms-fontColor-white'><label className="Underline">LOG </label>IN</Link></label>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}