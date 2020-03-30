import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export class Home extends React.Component {
    render() {
        return (
            <React.Fragment>

                    <Link to='/NewBooking' className='ms-bgColor-purple ms-bgColor-themeLight DashboardNavs'><div id='New_Booking'>Book A Ride</div></Link>
                    <Link to='/NewOffer' className='ms-bgColor-yellow ms-bgColor-themeLighterAlt DashboardNavs'><div id='New_offer'>Offer A Ride</div></Link>
            </React.Fragment>
        );
    }
}