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
		this.getBookings.bind(this);
	}
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
		this.getOffers();
		this.getBookings();
	}
	async getOffers() {
		let items = [];
		let bookings = await bookingService.getByUserID();
		bookings.forEach(async o => {
			let offer = await offerService.getByID(o.offerID.toString());
			let name = (await UserService.getByID(offer.userID)).name;
			items.push(<OfferCard Data={offer} name={name} />);
		})
		this.Bookings = items;
		this.setState({ Bookings: items });
	}
	async getBookings(){
		let items=[];
		let offers=await offerService.getByUserID();
		offers.forEach(async o=>{
			let bookings=await bookingService.getByOfferID(o.id);
			bookings.map(async b=>{
				let name = (await UserService.getByID(b.userID.toString())).name;
				items.push(<OfferCard Data={b} name={name} />);
			});

		})
		this.Offers = items;
		this.setState({ Offers: items })
	}

	render() {
		// if(this.Bookings.length==0){
		// 	this.getOffers();
		// }
		return (
			<React.Fragment>
				<div className="User_Bookings">
					<p id='p1'>Booked rides<button onClick={() => this.setState({ Offers: [] })}>lol</button></p>
					<div className='Data'>
						{this.Bookings}
					</div>
				</div>
				<div className="User_Bookings">
					<p id='p2'>Offered rides</p>
					<div className='Data'>
						{this.Offers}
					</div>
				</div>
			</React.Fragment>
		);
	}
}