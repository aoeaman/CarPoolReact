import React from "react";

const OfferCard:React.ElementType = ({ user, Data }) => {
    return (<div className="OfferCard ms-depth-8">
        <div id="name">
            <label>{user.name}</label>
            {<img className='Username' src={user.profileImage} />}
        </div>
        <div id="section">
            <div id="from">
                <p>From</p>
                <p>{Data.source}</p>
            </div>
            <span id='point' />
            <div id="to">
                <p>To</p>
                <p>{Data.destination}</p>
            </div>
        </div>
        <div id="section">
            <div id="showDate">
                <p>Date</p>
                <p>{Data.startDate.split(' ')[0]}</p>
            </div>
            <div id="interval">
                <p>Time</p>
                {Data.startDate.split(' ')[1]}
            </div>
        </div>
        <div id="section">
            <div id="price">
                <p id="label">Price</p>
                {Data.fare}
            </div>
            <div id="seats">
                <p id="label">Seats</p>
                <p id="seatContent">{Data.seatsAvailable != undefined ? Data.seatsAvailable : Data.seats}</p>
            </div>
        </div>
    </div>);
}
export default OfferCard;