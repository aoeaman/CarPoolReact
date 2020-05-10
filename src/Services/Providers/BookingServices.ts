import Axios from "axios";
import TokenServices from "./TokenServices";
import { Cities } from "../../Models/Cities";
import Booking from "../../Models/Booking"
import IBookingService from "../Contracts/IBookingServices";

export default class BookingServices implements IBookingService {
    public async getByID(ID: string):Promise<Booking> {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}`,
            { headers: { Authorization: AuthStr } });
        let Booking = JSON.parse(JSON.stringify((await responce).data));
        Booking.source = this.getKeyFromValue(Booking.source);
        Booking.destination = this.getKeyFromValue(Booking.destination);
        return Booking;
    }

    public async getByUserID():Promise<Array<Booking>> {
        let ID = TokenServices.getUserID();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Rider`,
            { headers: { Authorization: AuthStr } });
        let data:Array<Booking> = new Array<Booking>();
        data = this.parseFilteredData(JSON.parse(JSON.stringify((await responce).data)));
        return data;
    }
    
    public async getByOfferID(ID: string):Promise<Booking[]> {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/Booking/${ID}/Offer`,
            { headers: { Authorization: AuthStr } });
        let Booking = JSON.parse(JSON.stringify((await responce).data));
        Booking=this.parseFilteredData(Booking);
        return Booking;
    }

    public async Create(Source: string, Destination: string, Seats: number, OfferID: number):Promise<string> {
        let booking:Booking = new Booking();
        booking.Source = Cities[Source];
        booking.Destination = Cities[Destination];
        booking.userID = Number(TokenServices.getUserID());
        booking.offerID = OfferID;
        booking.Seats = Seats;
        booking.Fare = 18.50;
        const AuthStr:string = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const responce = Axios.post(`https://localhost:5001/api/Booking/create`, booking,
            { headers: { Authorization: AuthStr } });
        return (await responce).data.message
    }

    parseFilteredData(data:any):any {
        data.forEach(element => {
            element.source = this.getKeyFromValue(element.source);
            element.destination = this.getKeyFromValue(element.destination)
            element.startDate=new Date(element.startDate);
            element.startDate=element.startDate.toLocaleDateString()+' '+ element.startDate.toLocaleTimeString();
        });
        return data;
    }

    getKeyFromValue(val:number):string {
        return Object.entries(Cities).find(i => i[1] == val)[0];
    }
}