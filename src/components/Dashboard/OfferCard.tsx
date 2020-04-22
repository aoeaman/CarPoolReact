import React from "react";

const OfferCard = ({ offer, name,BookRide }) => {
    return (
        <div className="OfferCard ms-depth-8" onClick={()=>BookRide(offer.id)}>
            <div id="name">
                <label>{name}</label>
                {/* <img id='point' /> */}
            </div>
            <div id="section">
                <div id="from">
                    <p>From</p>
                    <p>{offer.source}</p>
                </div>
                <span id='point'/>
                <div id="to">
                    <p>To</p>
                    <p>{offer.destination}</p>
                </div>
            </div>
            <div id="section">
                <div id="showDate">
                    <p>Date</p>
                    <p>{offer.startDate.split(' ')[0]}</p>
                </div>
                <div id="interval">
                    <p>Time</p>
                    {offer.startDate.split(' ')[1]}
                </div>
            </div>
            <div id="section">
                <div id="price">
                    <p id="label">Price</p>
                    {/* <p id="priceContent">{offer.FarePrice}</p> */}
                </div>
                <div id="seats">
                    <p id="label">Seats</p>
                    <p id="seatContent">{offer.seatsAvailable}</p>
                </div>
                {/* <div id="section4">
						<label className="delete" onClick={this.handleDelete}>
							<i className="far fa-trash-alt"></i>
						</label>
					</div> */}
            </div>
        </div>

    );
}
export default OfferCard;