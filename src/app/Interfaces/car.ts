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

enum StateEnum {
    Available,
    Maintenance,
    Rented
}

enum TransmissionEnum {
    Manual,
    Automatic
}

enum TypeEnum {
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