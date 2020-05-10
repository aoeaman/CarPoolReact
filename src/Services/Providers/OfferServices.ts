import Offer, { ViaPoints } from "../../Models/Offer";
import Axios from "axios";
import TokenServices from "./TokenServices";
import {Cities} from "../../Models/Cities";
import IOfferService from "../Contracts/IOfferServices";

export default class OfferServices implements IOfferService {
    async getByID(ID: string) {
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/offer/${ID}`, { headers: { Authorization: AuthStr } });
        let offer=JSON.parse(JSON.stringify((await responce).data));
        offer.source=this.getKeyFromValue(offer.source);
        offer.destination=this.getKeyFromValue(offer.destination);
        return offer;
    }

    async getByUserID():Promise<Offer[]> {
        let ID=TokenServices.getUserID();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/offer/DriverOffer/${ID}`, { headers: { Authorization: AuthStr } });
        return JSON.parse(JSON.stringify((await responce).data));;
    }

    async Create(Source: string, Destination: string, viaPoints: Array<string>, Seats: number,DateTime:any):Promise<string> {
        let offer = new Offer();
        offer.userID = Number(TokenServices.getUserID());
        offer.Source = Cities[Source];
        offer.Destination = Cities[Destination];
        offer.seatsAvailable = Number(Seats);
        offer.ViaPoints = viaPoints.map(vp => new ViaPoints(Cities[vp])).filter(vp => vp != undefined);
        offer.StartDate=DateTime;
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const responce = Axios.post(`https://localhost:5001/api/offer/create`, offer, { headers: { Authorization: AuthStr } });
        return (await responce).data.message
    }

    async getFilteredOffers(Source: string, Destination: string, Seats: number,DateTime:any):Promise<Offer[]> {
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        const searchQuery = `?source=` + Source + `&destination=` + Destination + `&seats=` + 1+`&dateTime=`+DateTime;
        const responce = Axios.get(`https://localhost:5001/api/offer/search` + searchQuery, { headers: { Authorization: AuthStr } });
        let data = new Array<Offer>();
        data = this.parseFilteredData((await responce).data);
        return data;
    }

    parseFilteredData(data:any):any {
        data.forEach(element => {
            element.source = this.getKeyFromValue(element.source);
            element.destination = this.getKeyFromValue(element.destination)
        });
        return data;
    }

    getKeyFromValue(val:number):string {
        return Object.entries(Cities).find(i => i[1] == val)[0];
    }
}