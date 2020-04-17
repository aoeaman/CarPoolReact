import * as React from 'react';
import HideText from '../ToggleButtonn';
import OfferService from '../../../Services/OfferService';
import Offermatches from './OfferMatches';
import UserServices from '../../../Services/UserService';
const UserService = new UserServices();
interface myStates {
    time: string
    isNext: boolean
    nextText: string
    Offers: Array<any>
    Source: string
    Destinaiton: string
    Seats: number
}

export default class NewRide extends React.Component<{}, myStates> {
    offerService: OfferService
    constructor(props) {
        super(props);
        this.state = { Destinaiton: '', Seats: 0, Source: '', time: '', isNext: false, nextText: 'Next >>', Offers: new Array<any>() };
        this.offerService = new OfferService();
        this.GetTime.bind(this);
        this.handleSublit.bind(this);
    }
    GetTime = (e) => {
        let element = e.target.previousElementSibling;
        while (element) {
            element.style.backgroundColor = '#ffffff'
            element.style.color = '#000000'
            element = element.previousElementSibling;
        }
        element = e.target.nextSibling;
        while (element) {
            element.style.backgroundColor = '#ffffff'
            element.style.color = '#000000'
            element = element.nextSibling;
        }
        e.target.style.backgroundColor = '#9319ff';
        e.target.style.color = '#ffffff'
        this.setState({ time: e.target.innerHTML })
    }
    onInput = (evt) => {
        let value = evt.target.value
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    handleSublit = async () => {
        let offers = await this.offerService.getFilteredOffers(this.state.Source, this.state.Destinaiton, this.state.Seats);
        let items = new Array<any>(<div className='ms-depth-8 OfferCard' key='500'>
            <span id='name'>name</span>
            <span>Source</span>
            <span>destinantion</span>
        </div>);
        offers.forEach(async o => {
            items.push(<OfferCard offer={o} name={(await UserService.getByID(o.userID.toString())).name} />);
        })
        console.log(this.state.Offers);
        this.setState({ Offers: items });
    }
    render() {
        return (
            <React.Fragment>
                <div id='Form_Box' className='ms-depth-8'>
                    <form id='Box_form'>
                        <p className='Title'>Book A Ride</p>
                        <p className='p1'>we get you the matches asap!</p>

                        <label className='Form_Label1'>From</label>
                        <input className='Form_Input1' name='Source' onChange={this.onInput} type='text'></input>

                        <label className='Form_Label1'>To</label>
                        <input className='Form_Input1' name='Destination' onChange={this.onInput} type='text'></input>

                        <label className='Form_Label1'>Date</label>
                        <input className='Form_Input1' type='text' name='Date' onChange={this.onInput} placeholder='dd/mm/yy'></input>

                        <label className='Form_Label1'>Time</label>
                        <div>
                            <button type='button' onClick={this.GetTime}>5am-9am</button>
                            <button type='button' onClick={this.GetTime}>9am-12pm</button>
                            <button type='button' onClick={this.GetTime}>12pm-3pm</button>
                            <button type='button' onClick={this.GetTime}>3pm-6pm</button>
                            <button type='button' onClick={this.GetTime}>6pm-9pm</button>
                        </div>
                        <button className='Submit_Button' onClick={this.handleSublit} type='button'>Submit</button>
                    </form>
                    <HideText />
                </div>
                <div id='Offer_Matches'>
                    <span >Your Matches</span>
                    <div >
                        {this.state.Offers}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const OfferCard = ({ offer, name }) => {
    return (
        <div className='ms-depth-8 OfferCard' key={offer.id}>
            <span id='name'>{name}</span>
            <span>{offer.source}</span>
            <span>{offer.destinantion}</span>
        </div>
    );
}