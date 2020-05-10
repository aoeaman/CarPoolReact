import * as React from 'react';
import image from '../../Images/0004.png'
import TokenServices from '../../Services/Providers/TokenServices';
import User from '../../Models/User';
import UserServices from '../../Services/Providers/UserService';

interface MyStates {
    User: User
}

export default class Profile extends React.Component<{}, MyStates> {
    UserService: UserServices;
    constructor(props) {
        super(props);
        this.state = { User: new User() };
        this.UserService=new UserServices();
        this.HandleClick.bind(this);
    }

    async componentWillMount() {
        this.setState({ User: (await this.UserService.getByID(TokenServices.getUserID())) });
    }

    componentDidMount() {
        document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
    }

    componentDidUpdate(){
        let ProfileComponent = this.refs.ProfilePicture as HTMLDivElement;
        ProfileComponent.style.backgroundImage = "url(" + this.state.User.profileImage + ")";
        document.getElementById('DropDown').style.backgroundImage = "url(" + this.state.User.profileImage + ")";
    }

    private HandleClick():void {
        let element: HTMLInputElement = this.refs.fileUploader as HTMLInputElement;
        let image = element.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async ()=> {
            let user=await this.UserService.Update(this.state.User,reader.result);
            this.setState({User:user});
        }
    }

    render() {
        return (
            <div id='Profile'>
                <div id='ProfileImg' ref='ProfilePicture' className='ms-depth-8'
                    onClick={() => {
                        let Element: HTMLElement = this.refs.fileUploader as HTMLElement;
                        Element.click();
                    }}>
                    <input type="file" accept="image/*" id="file" ref="fileUploader" onChange={() => this.HandleClick()} style={{ display: "none" }} />
                </div>
                <div className='UserDetails'>
                    <div id='Name'>{this.state.User.name}</div>
                    <div id='Username'><span>Username:</span> {this.state.User.username}</div>
                    <div id='UserID'><span>ID:</span> {this.state.User.id}</div>
                    <div id='Phone'><span>Phone:</span> {this.state.User.phoneNumber}</div>
                    {/* <button style={{height:'5%',width:'10%',marginLeft:'5%'}} className='Login_Submit_Button'>Edit Profile</button> */}
                </div>


            </div>
        );
    }
}