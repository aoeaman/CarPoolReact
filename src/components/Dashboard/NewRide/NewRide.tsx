import * as React from 'react';
import Toggle from '../ToggleButton';
import image from '../../../Images/0004.png'
import OfferService from '../../../Services/OfferService';
import UserServices from '../../../Services/UserService';
import Offers from '../OfferCard';
interface myStates {
    time: string
    isNext: boolean
    nextText: string
    Offers: any
    Source: string
    Destinaiton: string
    Seats: number
}

export default class NewRide extends React.Component<{}, myStates> {
    offerService: OfferService;
    constructor(props) {
        super(props);
        this.state = {
            Destinaiton: '', Seats: 0, Source: '', time: '', isNext: false,
            nextText: 'Next >>', Offers:''
        };
        this.offerService = new OfferService();
        this.GetTime.bind(this);
        this.handleSubmit.bind(this);
    }
    componentDidMount(){
        document.getElementById('Dashboard').style.backgroundImage=`url(${image})`;
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

    handleSubmit(){
        let items=<Offers destination={this.state.Destinaiton} seats={0} source={this.state.Source}/>
        this.setState({Offers:items});
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
                        <input className='Form_Input1' name='Destinaiton' onChange={this.onInput} type='text'></input>

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
                        <button className='Submit_Button' onClick={()=>this.handleSubmit()} type='button'>Submit</button>
                    </form>
                    <Toggle />
                </div>
                <div id='Offer_Matches'>
                    <span >Your Matches</span>
                    {this.state.Offers}
                </div>
            </React.Fragment>
        );
    }
}