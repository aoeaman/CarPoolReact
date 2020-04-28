import Axios from "axios";
import TokenServices from "./TokenServices";
import {Cities} from "../Models/Cities";
import Booking from "../Models/Booking"
export default class BookingService {
    async getByID(ID: string) {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}`,
            { headers: { Authorization: AuthStr } });
        let booking = JSON.parse(JSON.stringify((await responce).data));
        return booking;
    }
    async getByUserID() {
        let ID = TokenServices.getUserID();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Rider`,
            { headers: { Authorization: AuthStr } });
        let bookings = JSON.parse(JSON.stringify((await responce).data));
        return bookings;
    }
    async getByOfferID() {
        let ID = TokenServices.getUserID();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Offer`,
            { headers: { Authorization: AuthStr } });
        let bookings = JSON.parse(JSON.stringify((await responce).data));
        return bookings;
    }
    async Create(Source: string, Destination: string, Seats: number, OfferID: number) {
        let booking=new Booking();
        booking.Source = Cities[Source];
        booking.Destination = Cities[Destination];
        booking.UserID = Number(TokenServices.getUserID());
        booking.OfferID = OfferID;
        booking.Seats = Seats;
        booking.Fare = 18.50;
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const responce = Axios.post(`https://localhost:5001/api/Booking/create`, booking,
            { headers: { Authorization: AuthStr } });
        return (await responce).data.message
    }
    getKeyFromValue(val) {
        return Object.entries(Cities).find(i => i[1] == val)[0];
    }
}