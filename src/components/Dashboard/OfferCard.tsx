import * as React from "react";
import UserServices from "../../Services/UserService";
import OfferService from "../../Services/OfferService";
import Popup from "reactjs-popup";
const UserService = new UserServices();
const offerService = new OfferService();
class Offers extends React.Component<{ source, destination, seats, bookride }, { Offer }>{
    items: any
    constructor(props) {
        super(props);
        this.state = { Offer: new Array<any>() }
        this.items = new Array<any>();
        this.componentDidUpdate(this.props);
    }
    async componentDidUpdate(prevProps) {
        this.items = [];
        let offers = await offerService.getFilteredOffers(this.props.source, this.props.destination,
            this.props.seats);
        offers.forEach(async o => {
            let name = (await UserService.getByID(o.userID.toString())).name;
            this.items.push(<OfferCard BookRide={this.props.bookride} key={o.id}
                offer={o} name={name} />);
        });
        if (this.state.Offer.length == 0)
            this.setState({ Offer: this.items })
        else if (prevProps != this.props) {
            this.setState({ Offer: [] });
        }
    }

    render() {
        let item = this.state.Offer;
        return (
            <div id="allmatches">
                {item}
            </div>
        );
    }
}

const OfferCard = ({ name, offer, BookRide }) => {
    
    return (
        <Popup key={offer.id} modal={true} className='Modal' repositionOnResize={true} trigger={
            <div className="OfferCard ms-depth-8">
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
                </div>
            </div>
        }>
            <div className='Modal'>
                <button>Yes</button>
                <button>No</button>
            </div>
        </Popup>
    );
}
export default Offers;