import { StateEnum, TransmissionEnum, TypeEnum } from "./car";

export interface CarFilter {
    make:string,
    color:string,
    maxRentalPrice:number,
    minRentalPrice:number,
    priceOrder:string,
    model:string,
    variant:string,
    numberOfPassengers:string,
    state:StateEnum,
    transmission:TransmissionEnum,
    type:TypeEnum
}
