import React from "react";
import OfferService from "../../Services/OfferService";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png'
import BookingService from "../../Services/BookingService";
import UserServices from "../../Services/UserService";
import Offer from "Models/Offer";

const offerService = new OfferService();
const bookingService = new BookingService();
const UserService = new UserServices();
export default class MyRides extends React.Component<{}, { Bookings: Array<any>, Offers: Array<any> }>{
	Offers: Array<any>;
	Bookings: Array<any>;
	constructor(props) {
		super(props);
		this.state = { Bookings: new Array<any>(), Offers: new Array<any>() };
		this.Offers = new Array<any>();
		this.Bookings = new Array<any>();
		this.getOffers.bind(this);
	}
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
		this.getOffers();
	}
	async getOffers() {
		let items = [];
		let bookings = await bookingService.getByUserID();
		bookings.forEach(async o => {
			let offer = await offerService.getByID(o.offerID);
			let name = (await UserService.getByID(offer.userID.toString())).name;
			items.push(<OfferCard Data={offer} name={name} />)
		})
		this.Bookings = items;
		this.setState({ Bookings: items })
	}

	render() {
		// if(this.Bookings.length==0){
		// 	this.getOffers();
		// }
		return (
			<React.Fragment>
				<div id="User_Bookings" key={1}>
					<p>Booked rides<button onClick={() => this.setState({ Offers: [] })}>lol</button></p>
					<div id='BookedRides'>
						{this.Bookings}
					</div>
				</div>
				<div id="User_Offers" key={2}>
					<p>Offered rides</p>
				</div>
			</React.Fragment>
		);
	}
}