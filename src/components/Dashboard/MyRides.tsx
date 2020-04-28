import React from "react";
import OfferService from "../../Services/OfferService";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png'

const offerService = new OfferService();
export default class MyRides extends React.Component{
	constructor(props) {
		super(props);
	}
    componentDidMount(){
        document.getElementById('Dashboard').style.backgroundImage=`url(${image})`;
    }
	render() {
		return (
			<React.Fragment>
				<div id="User_Bookings" key={1}>
					<p>Booked rides</p>
				</div>
				<div id="User_Offers" key={2}>
					<p>Offered rides</p>
				</div>
			</React.Fragment>
		);
	}
}