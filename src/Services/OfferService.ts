import Offer, { ViaPoints } from "../Models/Offer";
import Axios from "axios";
import TokenServices from "./TokenServices";

export default class OfferService {
    async getByID(ID: string) {
        let offer = new Offer();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/offer/${ID}`, { headers: { Authorization: AuthStr } });
        offer = JSON.parse(JSON.stringify((await responce).data));
    }
    async Create(Source: string, Destination: string, viaPoints: Array<string>, Seats: number) {
        let offer = new Offer();
        offer.userID = Number(TokenServices.getUserID());
        offer.Source = Cities[Source];
        offer.Destination = Cities[Destination];
        offer.SeatsAvailable = Number(Seats);
        offer.ViaPoints = viaPoints.map(vp => new ViaPoints(Cities[vp])).filter(vp=>vp!=undefined);
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const responce = Axios.post(`https://localhost:5001/api/offer/create`, offer, { headers: { Authorization: AuthStr } });
        return (await responce).data.message
    }
    async getFilteredOffers(Source: string, Destination: string, Seats: number){
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const searchQuery=`?source=`+Source+`&destination=`+Destination+`&seats=`+Number(Seats);
        const responce = Axios.get(`https://localhost:5001/api/offer/search` + searchQuery, { headers: { Authorization: AuthStr } });
        let data=new Array<Offer>();
        data=(await responce).data;
        return data;
    }
}

let Cities = {
    Ahemadabad: 0,
    Banglore: 1,
    Chandigarh: 2,
    Chennai: 3,
    Dehradun: 4,
    Gwalior: 5,
    Hyderabad: 6,
    Mumbai: 7,
    Patna: 8,
    Pune: 9,
    Vizag: 10,
}