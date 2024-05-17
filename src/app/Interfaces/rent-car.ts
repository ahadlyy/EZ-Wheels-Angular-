export interface RentCar {
    reservationNumber:string,
    startingDate:Date,
    endingDate:Date,
    pickUpLatitude:number,
    pickUpLongitude:number,
    dropOffLatitude:number,
    dropOffLongitude:number,
    customerName:string,
    customerId:string,
    plateNumber:string,
    make:string,
    model:string,
    totalRentPrice:number,
    isOnlinePaid:boolean,
    isInProgress:boolean,
    numberOfRentDays:number
}
