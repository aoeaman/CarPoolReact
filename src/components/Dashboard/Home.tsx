import * as React from "react";
import { Link } from "react-router-dom";

export class Home extends React.Component{
    render(){return (
        <div id='DashboardHome'>
            <Link to='/Dashboard/NewBooking' className='ms-bgColor-purple ms-bgColor-themeLight DashboardNavs'><div id='New_Booking'>Book A Ride</div></Link>
            <Link to='/Dashboard/NewOffer' className='ms-bgColor-yellow ms-bgColor-themeLighterAlt DashboardNavs'><div id='New_offer'>Offer A Ride</div></Link>
        </div>
    );}
}