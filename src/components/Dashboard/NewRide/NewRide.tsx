import * as React from 'react';


export default class NewRide extends React.Component {
    logout = (e) => {
        alert('Loging Out');
        this.setState({ isAuthenticated: false });
        localStorage.clear();
    }

    render() {
        return (
            <React.Fragment>
                <form id='Offer_Book' className='ms-depth-8'>  
                <div>
                            <p className='Title'>Book A Ride</p>
                            <p className='p1'>we get you the matches asap ! </p>
                    </div>                    
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