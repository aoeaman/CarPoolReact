export default class Booking {
    
    constructor(){
        this.StartDate=new Date();
    }
    id: number
    userID: number
    offerID: number
    Source: number
    Destination: number
    Seats: number
    Fare:number
    StartDate: Date
}