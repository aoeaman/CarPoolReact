import * as React from "react";
import Popup from "reactjs-popup";
import OfferCard from "../Components/OfferCard";
import { OfferService, UserService } from "../../../Context";
import Offer from "../../../Models/Offer";

interface OffersProps{
     source, 
     destination, 
     seats,
     Date, 
     bookride 
    }
class MatchedOffers extends React.Component<OffersProps, { Offer:Offer[] }>{
    items: any
    constructor(props) {
        super(props);
        this.state = { Offer: new Array<Offer>() }
        this.items = new Array<Offer>();
        this.componentDidUpdate(this.props);
    }
    async componentDidUpdate(prevProps) {
        this.items = [];
        let seat=0;
        let offers = await OfferService.getFilteredOffers(this.props.source, this.props.destination,
            this.props.seats,this.props.Date);
        offers.forEach(async o => {
            let user = (await UserService.getByID(o.userID.toString()));
            let seatButtons = [];
            for (let i = 1; i <= o.seatsAvailable; i++) {
                seatButtons.push(<button key={i} onClick={()=>seat=i}>{i}</button>)
            }
            this.items.push(
                <Popup modal={true} key={o.id} className='Modal' repositionOnResize={true}
                    trigger={<div>
                        <OfferCard key={o.id} Data={o} user={user} /></div>}>
                    <div className='Modal'>
                        <span>Do you want to Book this Offer</span>
                        <span>Select Number Of Seats To Book</span>
                        <div>
                        {seatButtons}
                        </div>
                        <div>
                        <button onClick={() => this.props.bookride(o.id,this.props,seat)}>Yes</button>
                        <button>No</button>
                        </div>
                    </div>
                </Popup>);
        });
        if (this.state.Offer.length == 0)
            this.setState({ Offer: this.items })
        else if (prevProps != this.props) {
            this.setState({ Offer: [] });
        }
    }
    render() {
        let {Offer}=this.state;
        return (
            <div id="allmatches">
                {Offer}
            </div>
        );
    }
}

export default MatchedOffers;