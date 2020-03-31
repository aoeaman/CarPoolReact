import * as React from 'react';
import {$} from 'jquery';
interface myStates{
    time:string
}

export default class NewRide extends React.Component<{},myStates> {
    constructor(props){
        super(props);
        this.state={time:''};
        this.GetTime.bind(this);
    }
    GetTime(e){
        console.log(e)
    }

    render() {
        return (
            <React.Fragment>
                <div id='Form_Box' className='ms-depth-8'>
                    <form id='Box_form'>
                        <p className='Title'>Book A Ride</p>
                        <p className='p1'>we get you the matches asap ! </p>

                        <label className='Form_Label1'>From</label>

                        <input className='Form_Input1' type='text'></input>
                        <label className='Form_Label1'>To</label>

                        <input className='Form_Input1' type='text'></input>

                        <label className='Form_Label1'>Date</label>

                        <input className='Form_Input1' type='text' placeholder='dd/mm/yy'></input>
                        
                        <label className='Form_Label1'>Time</label>
                        <div>
                            <button name='5-9' type='button' onClick={this.GetTime}>5am-9am</button>
                            <button type='button' onClick={this.GetTime}>9am-12pm</button>
                            <button type='button' onClick={this.GetTime}>12pm-3pm</button>
                        </div>
                        <div>
                            <button type='button' onClick={this.GetTime}>3pm-6pm</button>
                            <button type='button' onClick={this.GetTime}>6pm-9pm</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}