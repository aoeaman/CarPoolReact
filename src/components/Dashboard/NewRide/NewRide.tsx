import * as React from 'react';
import { NavLink } from 'react-router-dom';
interface myStates {
    time: string
    isNext: boolean
    nextText: string
}

export default class NewRide extends React.Component<{}, myStates> {
    constructor(props) {
        super(props);
        this.state = { time: '', isNext: false, nextText: 'Next >>' };
        this.GetTime.bind(this);
        this.ShowNextForm.bind(this);
    }
    GetTime = (e) => {
        let element=e.target.previousElementSibling;
        while(element){
            element.style.backgroundColor='#ffffff'
            element.style.color='#000000'
            element=element.previousElementSibling;
        }
        element=e.target.nextSibling;
        while(element){
            element.style.backgroundColor='#ffffff'
            element.style.color='#000000'
            element=element.nextSibling;
        }
        e.target.style.backgroundColor='#9319ff';
        e.target.style.color='#ffffff'
        console.log(e.target.innerHTML);
    }
    ShowNextForm = () => {
        this.setState({ isNext: !this.state.isNext, nextText: 'Back >>' });
        console.log(this.state.isNext);
    }
    render() {
        return (
            <React.Fragment>
                <div id='Form_Box' className='ms-depth-8'>
                    <form id='Box_form'>
                        <p className='Title'>Book A Ride</p>
                        <p className='p1'>we get you the matches asap!</p>

                        <label className='Form_Label1'>From</label>

                        <input className='Form_Input1' name='Source' type='text'></input>
                        <label className='Form_Label1'>To</label>

                        <input className='Form_Input1' name='Destination' type='text'></input>

                        <label className='Form_Label1'>Date</label>

                        <input className='Form_Input1' type='text' name='Date' placeholder='dd/mm/yy'></input>

                        <label className='Form_Label1'>Time</label>
                        <div>
                            <button type='button' onClick={this.GetTime}>5am-9am</button>
                            <button type='button' onClick={this.GetTime}>9am-12pm</button>
                            <button type='button' onClick={this.GetTime}>12pm-3pm</button>
                            <button type='button' onClick={this.GetTime}>3pm-6pm</button>
                            <button type='button' onClick={this.GetTime}>6pm-9pm</button>
                        </div>
                        <button className='Submit_Button' type='button'>Submit</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}