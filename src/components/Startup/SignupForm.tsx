import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


interface myState{
    Password: string
    PasswordHidden:boolean
    Email: string
    ConfirmPassword: string
}
export default class SignupForm extends Component<{}, myState> {
    constructor(props) {
        super(props);
        this.state = { Password: '',PasswordHidden:true, Email: '', ConfirmPassword: '' }
    }
    onInput(event) {
        let name = event.target.name;
        if (name == "Password")
            this.setState({ Password: event.target.value });
        if (name == "Email")
            this.setState({ Email: event.target.value });
        if (name == "ConfirmPassword")
            this.setState({ ConfirmPassword: event.target.value });
    }
    handleSubmit(){
        event.preventDefault();
    }
    showPassword() {
        this.setState({PasswordHidden:false});
    }
    hidePassword(){
        this.setState({PasswordHidden:true});
    }
    render() {
        return (
            <Fragment>

            <div id='Home'></div>
            <div id='Signup'>
            <form id="UserForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className='Form_Field'>
                    <label className='Form_Header'>S<label className="Underline">ign U</label>p</label>
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
                    <input type="password" name='ConfirmPassword' id='Form_Input3' className='Form_Input'
                        onChange={this.onInput.bind(this)} placeholder="Confirm Password"></input>

                    <label id='Form_Label3' className='Form_Label'>Confirm Password</label>
                </div>
                <div className='Form_Field'>
                <button className='Signup_Submit_Button' type='submit'>Submit</button>
                </div>
                <div className='Form_Field'>
                <label id='Nav_Link' className='ms-fontColor-white'>Already a Member? <Link to='/Login' className='ms-fontWeight-semibold ms-fontColor-white'><label className="Underline">LOG </label>IN</Link></label>
                </div>
            </form>
            </div>
            </Fragment>
        );
    }
}