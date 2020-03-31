import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Header';

export default class NewOffer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id='Form_Box' className='ms-depth-8'>
                <form id='Box_form'>
                    <p className='Title'>Offer A Ride</p>
                    <p className='p1'>we get you the matches asap ! </p>

                    <label className='Form_Label1'>From</label>

                    <input className='Form_Input1' type='text'></input>
                    <label className='Form_Label1'>To</label>

                    <input className='Form_Input1' type='text'></input>

                    <label className='Form_Label1'>Date</label>

                    <input className='Form_Input1' type='text' placeholder='dd/mm/yy'></input>

                    <label className='Form_Label1'>Time</label>
                    <div>
                            <button type='button'>5am-9am</button>
                            <button>9am-12 pm</button>
                            <button>12pm-3pm</button>
                        </div>
                        <div>
                            <button>3pm-6pm</button>
                            <button>6pm-9pm</button>
                        </div>
                    
                    </form>
                </div>
            </React.Fragment>
        );
    }
}