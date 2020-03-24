import * as React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

interface myState{
    Password: string
    PasswordHidden: boolean
    Email: string
    User: any
}

export default class LoginForm extends React.Component<{},myState>{
    
    constructor(props) {
        super(props);
        this.state = { Password: '', Email: '', PasswordHidden: true, User: null };
        
    }
    onInput(event) {
        let name = event.target.name;
        if (name == "Password")
            this.setState({ Password: event.target.value });

        if (name == "Email")
            this.setState({ Email: event.target.value });
    }
    handleSubmit() {
        event.preventDefault();
        let user = {
            Username: this.state.Email,
            Password: this.state.Password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('https://localhost:5001/api/user/login', requestOptions).then(res =>res.json()).then((data) => {
            this.setState({ User:data.item1}); localStorage.setItem('Usertoken', data.item2);
        }).catch(console.log);
    }
    showPassword() {
        this.setState({ PasswordHidden: false });
    }
    hidePassword() {
        this.setState({ PasswordHidden: true });
    }
    render() {
        if(localStorage.getItem('Usertoken')!=undefined)
        return    <Redirect to='/Signup'></Redirect>
        return (
            <div id='Login'>
                <form id="UserForm" onSubmit={this.handleSubmit.bind(this)}>
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
        );
    }

}