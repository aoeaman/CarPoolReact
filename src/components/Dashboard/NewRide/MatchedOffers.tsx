import * as React from "react";
import Popup from "reactjs-popup";
import OfferCard from "../Components/OfferCard";
import { OfferService, UserService } from "../../../Context";
import Offer from "../../../Models/Offer";
import User from "../../../Models/User";

interface ICard {
    Offer: Offer
    User: User
}

interface MatchedOffersState {
    Offer: ICard[]
}
interface OffersProps {
    source:string,
    destination:string,
    seats:number,
    Date:string,
    bookride:Function
}
export default class MatchedOffers extends React.Component<OffersProps, MatchedOffersState>{
    seats: number
    constructor(props) {
        super(props);
        this.state = { Offer: [] }
        this.seats = 0;
    }
    async componentWillMount() {
        let x: ICard[] = [];
        let offers = await OfferService.getFilteredOffers(this.props.source, this.props.destination,
            this.props.seats, this.props.Date);
        offers.forEach(async o => {
            let user = (await UserService.getByID(o.userID.toString()));
            x.push({ Offer: o, User: user });
            this.setState({ Offer: x });
        });

    }
    GetSeatButtons = (Offer) => {
        let seatButtons = [];
        for (let i = 1; i <= Offer.seatsAvailable; i++) {
            seatButtons.push(<button key={i} onClick={() => this.seats = i}>{i}</button>)
        }
        return seatButtons;
    }
    render() {
        let items = [];
        items.push(this.state.Offer.map(o =>
            <Popup modal={true} key={o.Offer.id} className='Modal' repositionOnResize={true}
                trigger={<div>
                    <OfferCard key={o.Offer.id} Data={o.Offer} user={o.User} /></div>}>
                <div className='Modal'>
                    <span>Do you want to Book this Offer</span>
                    <span>Select Number Of Seats To Book</span>
                    <div>
                        {this.GetSeatButtons(o.Offer)}
                    </div>
                    <div>
                        <button onClick={() => this.props.bookride(o.Offer.id, this.props, this.seats)}>
                            Yes
                            </button>
                        <button>No</button>
                    </div>
                </div>
            </Popup>));

        return (
            <div id="allmatches">
                {items}
            </div>
        );
    }
}

