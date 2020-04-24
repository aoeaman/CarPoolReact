import * as React from "react";
import UserServices from "../../Services/UserService";
import OfferService from "../../Services/OfferService";
const UserService = new UserServices();
const offerService = new OfferService();
class Offers extends React.Component<{ source, destination, seats},{Offer}>{
    items:any
    constructor(props) {
        super(props);
        this.state={Offer:new Array<any>()}
        this.items=new Array<any>();
        this.componentDidUpdate(this.props);
    }
    async componentDidUpdate(prevProps) {
        this.items =[];
        let offers = await offerService.getFilteredOffers(this.props.source, this.props.destination,
            this.props.seats);
        offers.forEach(async o => {
            let name = (await UserService.getByID(o.userID.toString())).name;
            this.items.push(<OfferCard BookRide={this.BookRide} key={o.id}
                offer={o} name={name} />);
        });
        if(this.state.Offer.length==0)
            this.setState({Offer:this.items})
        else if(prevProps!=this.props){
            this.setState({Offer:[]});
        }
    }
    BookRide(id: number) {
        console.log(id);
    }
    render() {
        let item=this.state.Offer;
        return (
            <div id="allmatches">
                {item}
            </div>
        );
    }
}
const OfferCard = ({ name, offer, BookRide }) => {
    return (
        <div className="OfferCard ms-depth-8" onClick={() => BookRide(offer.id)}>
            <div id="name">
                <label>{name}</label>
                {/* <img id='point' /> */}
            </div>
            <div id="section">
                <div id="from">
                    <p>From</p>
                    <p>{offer.source}</p>
                </div>
                <span id='point' />
                <div id="to">
                    <p>To</p>
                    <p>{offer.destination}</p>
                </div>
            </div>
            <div id="section">
                <div id="showDate">
                    <p>Date</p>
                    <p>{offer.startDate.split(' ')[0]}</p>
                </div>
                <div id="interval">
                    <p>Time</p>
                    {offer.startDate.split(' ')[1]}
                </div>
            </div>
            <div id="section">
                <div id="price">
                    <p id="label">Price</p>
                    {/* <p id="priceContent">{props.offer.FarePrice}</p> */}
                </div>
                <div id="seats">
                    <p id="label">Seats</p>
                    <p id="seatContent">{offer.seatsAvailable}</p>
                </div>
                {/* <div id="section4">
						<label className="delete" onClick={this.handleDelete}>
							<i className="far fa-trash-alt"></i>
						</label>
					</div> */}
            </div>
        </div>
    );
}
export default Offers;