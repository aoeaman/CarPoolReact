import * as React from 'react';
import OfferService from '../../../Services/OfferService';
import { Redirect } from 'react-router';
import HideText from '../Components/ToggleButton';
import image from '../../../Images/0004.png';

interface myStates {
    isNext: boolean
    nextText: string

    Source: string
    Destinaiton: string
    Seats: number
    Date: string
    time: string
    ViaPoints: Array<string>


}
export default class NewOffer extends React.Component<{}, myStates>  {
    offerService: OfferService
    constructor(props) {
        super(props);
        this.state = {
            time: '', isNext: false, nextText: 'Next >>', Date: '',
            Destinaiton: '', Source: '', Seats: 0, ViaPoints: new Array<string>()
        };
        this.offerService = new OfferService();
        this.addViaPoints.bind(this);
        this.onInput.bind(this);
        this.getTimeAndSeats.bind(this);
        this.ShowNextForm.bind(this);
        this.onSubmit.bind(this);
    }
    componentDidMount(){
        document.getElementById('Dashboard').style.backgroundImage=`url(${image})`;
    }
    getTimeAndSeats = (e) => {
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
        if (Number(e.target.innerHTML)) {
            this.setState({ Seats: e.target.innerHTML })
        }
        else {
            this.setState({ time: e.target.innerHTML })
        }
    }
    addViaPoints = (evt) => {
        let value = evt.target.value;
        let id = Number(evt.target.name);
        let Viapoints = this.state.ViaPoints;
        console.log(Viapoints);
        Viapoints[id] = value
        this.setState({ ViaPoints: Viapoints })
        console.log(Viapoints);
    }
    onInput = (evt) => {
        let value = evt.target.value
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    ShowNextForm = () => {
        event.preventDefault();
        this.setState({ isNext: !this.state.isNext, nextText: !this.state.isNext ? 'Back >>' : 'Next >>' });
        return false;
    }
    onSubmit = async () => {
        let offerID = await this.offerService.Create(this.state.Source, this.state.Destinaiton, this.state.ViaPoints, this.state.Seats);
        if (offerID) {
            alert("Offer Created Successfully with ID " + offerID);
            <Redirect to="/" />
        }
        else {
            alert("Error Occured");
        }
    }
    render() {
        if (this.state.isNext) {
            return (
                <React.Fragment>
                    <div id='Form_Box' className='ms-depth-8'>
                        <form id='Box_form'>
                            <p className='Title'>Offer A Ride</p>
                            <p className='p1'>we get you the matches asap!</p>

                            <label className='Form_Label1'>From</label>
                            <input className='Form_Input1' required name='Source' onChange={this.onInput} type='text'></input>

                            <label className='Form_Label1'>To</label>
                            <input className='Form_Input1' required name='Destinaiton' onChange={this.onInput} type='text'></input>

                            <label className='Form_Label1'>Date</label>
                            <input className='Form_Input1' required type='text' name='Date' onChange={this.onInput} placeholder='dd/MM/yyyy'></input>

                            <label className='Form_Label1'>Time</label>
                            <div>
                                <button type='button' onClick={this.getTimeAndSeats}>5am-9am</button>
                                <button type='button' onClick={this.getTimeAndSeats}>9am-12pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>12pm-3pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>3pm-6pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>6pm-9pm</button>
                            </div>
                            <button id='Next_Button' type='submit' onClick={this.ShowNextForm}>{this.state.nextText}</button>
                        </form>
                            <HideText/>
                    </div>
                    <div id='Form_Box' className='ms-depth-8'>
                        <form id='Box_form'>
                            <p className='Title'>Offer A Ride</p>
                            <p className='p1'>we get you the matches asap!</p>

                            <label className='Form_Label1'>Stop 1</label>
                            <input className='Form_Input1' name='0' onChange={this.addViaPoints} type='text'></input>

                            <label className='Form_Label1'>Stop 2</label>
                            <input className='Form_Input1' name='1' onChange={this.addViaPoints} type='text'></input>

                            <label className='Form_Label1'>Stop 3</label>
                            <input className='Form_Input1' name='2' onChange={this.addViaPoints} type='text'></input>

                            <div className='Seats'>
                                <span className='ms-fontColor-gray110'>Seats Available</span>
                                <div>
                                    <button className='Seat_button' type='button' onClick={this.getTimeAndSeats}>1</button>
                                    <button className='Seat_button' type='button' onClick={this.getTimeAndSeats}>2</button>
                                    <button className='Seat_button' type='button' onClick={this.getTimeAndSeats}>3</button>
                                </div>
                            </div>
                            <div className='Price'>
                                <span className='ms-fontColor-gray110'>Price</span>
                                <div>
                                    <div> $180</div>
                                </div>
                            </div>
                            <button className='Submit_Button' type='button' onClick={this.onSubmit}>Submit</button>
                        </form>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (

                <React.Fragment>
                    <div id='Form_Box' className='ms-depth-8'>
                        <form id='Box_form' onSubmit={this.ShowNextForm}>
                            <p className='Title'>Offer A Ride</p>
                            <p className='p1'>we get you the matches asap!</p>
                            <label className='Form_Label1'>From</label>
                            <input className='Form_Input1' required name='Source' onChange={this.onInput} type='text'></input>

                            <label className='Form_Label1'>To</label>
                            <input className='Form_Input1' required name='Destinaiton' onChange={this.onInput} type='text'></input>

                            <label className='Form_Label1'>Date</label>
                            <input className='Form_Input1' required type='text' name='Date' onChange={this.onInput} placeholder='dd/MM/yyyy'></input>

                            <label className='Form_Label1'>Time</label>
                            <div>
                                <button type='button' onClick={this.getTimeAndSeats}>5am-9am</button>
                                <button type='button' onClick={this.getTimeAndSeats}>9am-12pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>12pm-3pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>3pm-6pm</button>
                                <button type='button' onClick={this.getTimeAndSeats}>6pm-9pm</button>
                            </div>
                            <button id='Next_Button' type='submit'>{this.state.nextText}</button>
                        </form>
                            <HideText/>
                    </div>
                </React.Fragment>
            );
        }
    }
}