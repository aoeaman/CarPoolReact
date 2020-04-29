import React from "react";
import OfferService from "../../Services/OfferService";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png'
import BookingService from "../../Services/BookingService";
import UserServices from "../../Services/UserService";

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
	}
	async componentWillMount() {
		let items = [];
		let booking = await bookingService.getByUserID();
		booking.forEach(async o => {
			let name = (await UserService.getByID(o.userID.toString())).name;
			items.push(
				<OfferCard key={o.id} Data={o} name={name} />);
		});
		this.Bookings = items;
		// items.push(booking.map(async o => {
		// 	let name = (await UserService.getByID(o.userID.toString())).name;
		// 	return (<OfferCard key={o.id} Data={o} name={name} />);
		// }))
		this.setState({ Bookings: items });
	}
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
	}
	render() {
		return (
			<React.Fragment>
				<div id="User_Bookings" key={1}>
					<p>Booked rides</p>
					<div>
						{this.state.Bookings}
					</div>
				</div>
				<div id="User_Offers" key={2}>
					<p>Offered rides</p>
				</div>
			</React.Fragment>
		);
	}
}