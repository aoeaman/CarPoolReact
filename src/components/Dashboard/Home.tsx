import * as React from "react";
import { Link } from "react-router-dom";
import UserServices from "../../Services/UserService";
import TokenServices from "../../Services/TokenServices";
import image from '../../Images/0003.png'
interface myStates {
    Name: string
}
export default class Home extends React.Component<{},myStates> {
    UserService:UserServices;
    constructor(props) {
        super(props)
        this.state = { Name:''}
        this.UserService=new UserServices()
    }
    async UNSAFE_componentWillMount() {
        let name=(await this.UserService.getByID(TokenServices.getUserID())).name.split(' ')[0]
        this.setState({ Name:name})  
    }
    componentDidMount(){
        document.getElementById('Dashboard').style.backgroundImage=`url(${image})`;
    }
    render() {
        return (
            <React.Fragment>
                <div id='DashboardHome'>
                    <span id='NameOfUser'>Hey, {this.state.Name}</span>
                    <div id='DashboardNavs'>
                        <Link to='/Dashboard/NewBooking' className='ms-bgColor-purple ms-bgColor-themeLight DashboardItems'><div id='New_Booking'>Book A Ride</div></Link>
                        <Link to='/Dashboard/NewOffer' className='ms-bgColor-yellow ms-bgColor-themeLighterAlt DashboardItems'><div id='New_offer'>Offer A Ride</div></Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}