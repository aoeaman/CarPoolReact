import Axios from "axios";
import TokenServices from "./TokenServices";
import { Cities } from "../Models/Cities";
import Booking from "../Models/Booking"
export default class BookingService {
    async getByID(ID: string) {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}`,
            { headers: { Authorization: AuthStr } });
        let Booking = JSON.parse(JSON.stringify((await responce).data));
        Booking.source = this.getKeyFromValue(Booking.source);
        Booking.destination = this.getKeyFromValue(Booking.destination);
        return Booking;
    }
    async getByUserID() {
        let ID = TokenServices.getUserID();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Rider`,
            { headers: { Authorization: AuthStr } });
        let data = new Array<Booking>();
        data = this.parseFilteredData(JSON.parse(JSON.stringify((await responce).data)));
        return data;
    }
    async getByOfferID(ID: string) {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Offer`,
            { headers: { Authorization: AuthStr } });
        let Booking = JSON.parse(JSON.stringify((await responce).data));
        Booking=this.parseFilteredData(Booking);
        return Booking;
    }
    async Create(Source: string, Destination: string, Seats: number, OfferID: number) {
        let booking = new Booking();
        booking.Source = Cities[Source];
        booking.Destination = Cities[Destination];
        booking.UserID = Number(TokenServices.getUserID());
        booking.offerID = OfferID;
        booking.Seats = Seats;
        booking.Fare = 18.50;
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const responce = Axios.post(`https://localhost:5001/api/Booking/create`, booking,
            { headers: { Authorization: AuthStr } });
        return (await responce).data.message
    }
    parseFilteredData(data) {
        data.forEach(element => {
            element.source = this.getKeyFromValue(element.source);
            element.destination = this.getKeyFromValue(element.destination)
            element.startDate=new Date(element.startDate);
            element.startDate=element.startDate.toLocaleDateString()+' '+ element.startDate.toLocaleTimeString();
        });
        return data;
    }
    getKeyFromValue(val) {
        return Object.entries(Cities).find(i => i[1] == val)[0];
    }
}