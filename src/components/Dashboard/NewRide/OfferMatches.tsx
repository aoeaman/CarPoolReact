import * as React from 'react';
import Offer from '../../../Models/Offer';
import UserServices from '../../../Services/UserService';
import TokenServices from '../../../Services/TokenServices';
const UserService = new UserServices()
interface myProps {
    Offers: Array<Offer>
}
interface myStates {
    Offers: Array<Offer>
    items: Array<any>
}

export default class Offermatches extends React.Component<myProps, myStates>{
    constructor(props) {
        super(props);
        this.state = { Offers: new Array<Offer>(), items: [] }
    }
    componentWillReceiveProps() {
        this.renderItems();
    }
    renderItems = () => {
        let newArr = this.props.Offers;
        let items = [];
        if (newArr.length!=0) {
            newArr.forEach(e => {
                items.push(
                    <li id='OfferCard' key={e.id}>
                        <span id='name'>Username{e.Source}</span>
                    </li>
                );
            });
            console.log(this.state.items);
        }
        this.setState({ items: items });
    }
    render() {
        return (
            <div id='Offer_Matches'>
                <span >Your Matches</span>
                <ul id='Offer_Matches'>
                    {this.state.items}
                </ul>
            </div>
        );
    }
}
const OfferCard = (offer: Offer) => {
    let name = GetName(offer.userID);
    return (
        <div id='OfferCard' key={offer.id}>
            <span id='name'>Username{name}</span>
        </div>
    );
}
async function GetName(id: number) {
    let name = (await UserService.getByID(id.toString())).name;
    console.log(name)
    return name;
}