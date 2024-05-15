export interface RentCar {
    ReservationNumber:string,
    StartingDate:Date,
    EndingDate:Date,
    PickUpLatitude:number,
    PickUpLongitude:number,
    DropOffLatitude:number,
    DropOffLongitude:number,
    CustomerName:string,
    CustomerId:string,
    PlateNumber:string,
    Make:string,
    Model:string,
    TotalRentPrice:number,
    IsOnlinePaid:boolean,
    IsInProgress:boolean,
    NumberOfRentDays:number
}
