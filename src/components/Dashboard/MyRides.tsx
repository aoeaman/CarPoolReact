import React from "react";
import OfferCard from "./Components/OfferCard";
import image from '../../Images/0004.png';
import User from "../../Models/User";
import Offer from "../../Models/Offer";
import BookingServices from "../../Services/Providers/BookingServices";
import OfferServices from "../../Services/Providers/OfferServices";
import UserServices from "../../Services/Providers/UserService";
import Booking from "../../Models/Booking";

interface IOfferCard{
	User:User
	Offer:Offer|Booking
}
interface myStates {
	Bookings: IOfferCard[]
	Offers: IOfferCard[]
}
export default class MyRides extends React.Component<{}, myStates>{
	OfferService:OfferServices
	UserService:UserServices
	BookingService:BookingServices
	constructor(props) {
		super(props);
		this.state = { Bookings:[], Offers: []};

		this.BookingService=new BookingServices();
		this.OfferService=new OfferServices();
		this.UserService=new UserServices();

	}
	
	componentDidMount() {
		document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
	}

	async componentWillMount() {
		let x:IOfferCard[]=[];
		let bookings = await this.BookingService.getByUserID();
		bookings.forEach(async o => {
			let offer:Offer = await this.OfferService.getByID(o.offerID.toString());
			let user:User = (await this.UserService.getByID(offer.userID.toString()));
			let obj:IOfferCard={Offer:offer,User:user}
			x.push(obj);
			this.setState({Bookings:x});
		});

		let y:IOfferCard[]=[];
		let offers = await this.OfferService.getByUserID();
		offers.forEach(async o => {
			let bookings = await this.BookingService.getByOfferID(o.id.toString());
			bookings.map(async b => {
				let user = (await this.UserService.getByID(b.userID.toString()));
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