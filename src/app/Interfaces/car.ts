export interface Car {
    PlateNumber:string,
    ChassisNumber:string,
    Make:string,
    Color:string,
    RentalPrice:number,
    Model:string,
    Variant:string,
    Mileage:number,
    NumberOfPassengers:number,
    State:StateEnum,
    Transmission:TransmissionEnum,
    Type:TypeEnum
}

export enum StateEnum {
    Available,
    Maintenance,
    Rented
}

export enum TransmissionEnum {
    Manual,
    Automatic
}

export enum TypeEnum {
    SUV,
    Sedan,
    Hatchback,
    Crossover,
    Van,
    Sports,
    Hybrid,
    Electric,
    Convertible
}