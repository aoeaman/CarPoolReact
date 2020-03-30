import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default class NewOffer extends React.Component {
    render() {
        return (
                <React.Fragment>
                    <form id='Offer_Ride' className='ms-depth-8'>                      
                            <span id='title'>Offer A Ride</span>
                    </form>
                </React.Fragment>
    );
    }
}