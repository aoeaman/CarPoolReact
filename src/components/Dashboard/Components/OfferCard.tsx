import React from "react";

const OfferCard = ({ name, Data }) => {
    return (
            <div className="OfferCard ms-depth-8">
                <div id="name">
                    <label>{name}</label>
                    {/* <img id='point' /> */}
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
                        <p>{Data.startDate}</p>
                    </div>
                    <div id="interval">
                        <p>Time</p>
                        {Data.startDate}
                    </div>
                </div>
                <div id="section">
                    <div id="price">
                        <p id="label">Price</p>
                        {/* <p id="priceContent">{props.Data.FarePrice}</p> */}
                    </div>
                    <div id="seats">
                        <p id="label">Seats</p>
                        <p id="seatContent">{Data.seatsAvailable}</p>
                    </div>
                </div>
            </div>
    );
}
export default OfferCard;