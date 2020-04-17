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
        this.state = { Offers: new Array<Offer>(), items: new Array<any>() }
        this.renderItems.bind(this);
    }
    componentWillReceiveProps() {
        this.renderItems();
    }
    renderItems(){
        let newArr = this.props.Offers;
        let items =new Array<any>();
        items.push(newArr.map(o=> <OfferCard offer={o}/>))
        this.setState({ items: items });
    }
    render() {
        return (
            <div id='Offer_Matches'>
                <span >Your Matches</span>
                <ul >
                    {this.state.items}
                </ul>
            </div>
        );
    }
}
const OfferCard=({offer})=>{
    let name=GetName(offer.userID);
    return (
        <div id='OfferCard' key={offer.id}>
            <span id='name'>Username{name}</span>
        </div>
    );
}
async function GetName(id: number) {
    let name = (await UserService.getByID(id.toString())).name;
    return name;
}