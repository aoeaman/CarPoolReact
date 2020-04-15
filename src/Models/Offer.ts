export default class Offer {
    constructor() {
        this.ViaPoints=new Array<ViaPoints>();
        this.StartDate=new Date();
        this.VehicleID=1
    }
    ID: number
    userID: number
    VehicleID: number
    Source: number
    Destination: number
    StartDate: Date
    SeatsAvailable: number
    ViaPoints: Array<ViaPoints>
}

export class ViaPoints{
    constructor(city:number){
        this.City=city
    }
    City:number
}