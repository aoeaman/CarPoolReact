import Offer from "Models/Offer";

export default interface IOfferServices {
    getByID(ID: string):Promise<Offer>,
    getByUserID():Promise<Offer[]>,
    Create(Source: string, Destination: string, viaPoints: Array<string>, Seats: number,DateTime:any):Promise<string>,
    getFilteredOffers(Source: string, Destination: string, Seats: number,DateTime:any):Promise<Offer[]>
}