import Booking from "Models/Booking";

export default interface IBookingServices {
    getByID(ID: string):Promise<Booking>,
    getByUserID():Promise<any>,
    getByOfferID(ID: string):Promise<any>,
    Create(Source: string, Destination: string, Seats: number, OfferID: number):Promise<any>
}