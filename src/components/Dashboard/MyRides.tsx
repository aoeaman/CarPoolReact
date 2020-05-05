import React from "react";
import OfferService from "../../Services/OfferService";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png'
import BookingService from "../../Services/BookingService";
import UserServices from "../../Services/UserService";

const offerService = new OfferService();
const bookingService = new BookingService();
const UserService = new UserServices();

interface myStates {
	Bookings: Array<any>
	Offers: Array<any>
	flag:boolean
}
export default class MyRides extends React.Component<{}, myStates>{
	constructor(props) {
		super(props);
		this.state = { Bookings: new Array<any>(), Offers: new Array<any>() ,flag:false};
	}
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
	}
	async componentWillMount() {
		let bookings = await bookingService.getByUserID();
		bookings.forEach(async o => {
			let offer = await offerService.getByID(o.offerID.toString());
			let name = (await UserService.getByID(offer.userID)).name;
			this.state.Bookings.push(<OfferCard Data={offer} name={name} />);
			this.setState({Bookings:this.state.Bookings});
		});
		let offers = await offerService.getByUserID();
		offers.forEach(async o => {
			let bookings = await bookingService.getByOfferID(o.id);
			bookings.map(async b => {
				let name = (await UserService.getByID(b.userID.toString())).name;
				this.state.Offers.push(<OfferCard Data={b} name={name} />);
				this.setState({Offers:this.state.Offers});
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="User_Bookings">
					<p id='p1'>Booked rides<button onClick={()=>console.log(this.state)}>lol</button></p>
					<div className='Data'>
						{this.state.Bookings}
					</div>
				</div>
				<div className="User_Bookings">
					<p id='p2'>Offered rides</p>
					<div className='Data'>
						{this.state.Offers}
					</div>
				</div>
			</React.Fragment>
		);
	}
}