import React from "react";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png'
import { BookingService, OfferService, UserService } from "../../Context";
import User from "../../Models/User";
import Offer from "../../Models/Offer";

interface IOfferCard{
	User:User
	Offer:Offer
}
interface myStates {
	Bookings: IOfferCard[]
	Offers: IOfferCard[]
}
export default class MyRides extends React.Component<{}, myStates>{
	constructor(props) {
		super(props);
		this.state = { Bookings:[], Offers: []};
	}
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
	}
	async componentWillMount() {
		let x:IOfferCard[]=[];
		let bookings = await BookingService.getByUserID();
		bookings.forEach(async o => {
			let offer:Offer = await OfferService.getByID(o.offerID.toString());
			let user:User = (await UserService.getByID(offer.userID.toString()));
			let obj:IOfferCard={Offer:offer,User:user}
			x.push(obj);
			this.setState({Bookings:x});
		});

		let y:IOfferCard[]=[];
		let offers = await OfferService.getByUserID();
		offers.forEach(async o => {
			let bookings = await BookingService.getByOfferID(o.id);
			bookings.map(async b => {
				let user = (await UserService.getByID(b.userID.toString()));
				let obj:IOfferCard={Offer:b,User:user}
				y.push(obj);
				this.setState({Offers:y});
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="User_Bookings">
					<p id='p1'>Booked rides</p>
					<div className='Data'>
						{this.state.Bookings.map(x=> {return(<OfferCard Data={x.Offer} user={x.User} />)})}
						
					</div>
				</div>
				<div className="User_Bookings">
					<p id='p2'>Offered rides</p>
					<div className='Data'>
						{this.state.Offers.map(x=> {return(<OfferCard Data={x.Offer} user={x.User} />)})}
					</div>
				</div>
			</React.Fragment>
		);
	}
}