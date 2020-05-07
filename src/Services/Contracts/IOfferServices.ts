export default interface IOfferServices {
    getByID(ID: string):Promise<any>,
    getByUserID():Promise<any>,
    Create(Source: string, Destination: string, viaPoints: Array<string>, Seats: number,DateTime:any):Promise<any>,
    getFilteredOffers(Source: string, Destination: string, Seats: number,DateTime:any):Promise<any>
}