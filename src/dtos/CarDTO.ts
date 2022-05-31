export interface CardTDO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: Type;
  thumbnail: string;
  accessories: Accessory[];
  photos: Photos[];
}

export interface Accessory {
  id: string;
  name: string;
  type: Type;
}

export interface Photos {
  id: string;
  photo: string;
}

export enum Type {
  Acceleration = 'acceleration',
  ElectricMotor = 'electric_motor',
  Exchange = 'exchange',
  Seats = 'seats',
  Speed = 'speed',
  TurningDiameter = 'turning_diameter',
  GasolineMotor = 'gasoline_motor',
  HybridMotor = 'hybrid_motor',
}
