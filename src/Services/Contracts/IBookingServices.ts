import Booking from "Models/Booking";

export default interface IBookingServices {
    getByID(ID: string):Promise<Booking>,
    getByUserID():Promise<Booking[]>,
    getByOfferID(ID: string):Promise<Booking[]>,
    Create(Source: string, Destination: string, Seats: number, OfferID: number):Promise<string>
}