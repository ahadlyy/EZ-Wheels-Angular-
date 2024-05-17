export interface Car {
    plateNumber:string,
    chassisNumber:string,
    photoUrl:string,
    make:string,
    color:string,
    rentalPrice:string,
    model:string,
    variant:string,
    mileage:string,
    numberOfPassengers:string,
    state:StateEnum,
    transmission:TransmissionEnum,
    type:TypeEnum
}

export enum StateEnum {
    Available,
    Maintenance,
    Rented
}

export enum TransmissionEnum {
    Manual=0,
    Automatic=1
}

export enum TypeEnum {
    SUV,
    Sedan,
    Hatchback,
    Crossover,
    Sports,
    Electric,
    Convertible
}