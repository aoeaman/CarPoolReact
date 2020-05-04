export default class Booking {
    
    constructor(){
        this.StartDate=new Date();
    }
    id: number
    UserID: number
    offerID: number
    Source: number
    Destination: number
    Seats: number
    Fare:number
    StartDate: Date
}