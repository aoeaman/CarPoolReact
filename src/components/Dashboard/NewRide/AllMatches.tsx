import * as React from "react";
import UserServices from "../../../Services/UserService";
import OfferService from "../../../Services/OfferService";
import Popup from "reactjs-popup";
import OfferCard from "../Components/OfferCard";
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
        let seat=0;
        let offers = await offerService.getFilteredOffers(this.props.source, this.props.destination,
            this.props.seats);
        offers.forEach(async o => {
            let name = (await UserService.getByID(o.userID.toString())).name;
            let seatButtons = [];
            for (let i = 1; i <= o.seatsAvailable; i++) {
                seatButtons.push(<button key={i} onClick={()=>seat=i}>{i}</button>)
            }
            this.items.push(
                <Popup modal={true} key={o.id} className='Modal' repositionOnResize={true}
                    trigger={<div>
                        <OfferCard key={o.id} Data={o} name={name} /></div>}>
                    <div className='Modal'>
                        <span>Do you want to Book this Offer</span>
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
        let item = this.state.Offer;
        return (
            <div id="allmatches">
                {item}
            </div>
        );
    }
}

export default Offers;