export default class Offer {
    constructor() {
        this.ViaPoints=new Array<ViaPoints>();
        this.StartDate=new Date();
        this.VehicleID=1
    }
    ID: number
    UserID: number
    VehicleID: number
    Source: number
    Destination: number
    StartDate: Date
    EndDate: Date
    SeatsAvailable: number
    ViaPoints: Array<ViaPoints>
}

class ViaPoints{
    constructor(city:number){
        this.City=city
    }
    City:number
}