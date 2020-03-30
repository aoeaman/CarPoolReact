import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Header';

export default class NewOffer extends React.Component {
    render() {
        return (
            <React.Fragment>

                <form id='Offer_Book' className='ms-depth-8'>
                    <div className='Title'>Offer A Ride</div>
                    <div className='p1'>we get you the matches asap ! </div>
                    <div>
                        <label className='Form_Label1'>From</label>
                    </div>
                    <div >
                        <input className='Form_Input1' type='text'></input>
                    </div>
                    <div>
                        <label className='Form_Label1'>To</label>
                    </div>
                    <div>
                        <input className='Form_Input1' type='text'></input>
                    </div>
                    <div>
                        <label className='Form_Label1'>Date</label>
                    </div>
                    <div>
                        <input className='Form_Input1' type='text' placeholder='dd/mm/yy'></input>
                    </div>

                </form>
            </React.Fragment>
        );
    }
}