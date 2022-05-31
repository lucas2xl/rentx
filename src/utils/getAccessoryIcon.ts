import { Type } from '../dtos/CarDTO';
import spedSvg from '../assets/speed.svg';
import accelerationSvg from '../assets/acceleration.svg';
import forceSvg from '../assets/force.svg';
import gasolineSvg from '../assets/gasoline.svg';
import exchangeSvg from '../assets/exchange.svg';
import peopleSvg from '../assets/people.svg';
import energy from '../assets/energy.svg';
import hybrid from '../assets/hybrid.svg';

export const getAccessoryIcon = (type: Type) => {
  switch (type) {
    case Type.Speed:
      return spedSvg;
    case Type.Acceleration:
      return accelerationSvg;
    case Type.Exchange:
      return exchangeSvg;
    case Type.Seats:
      return peopleSvg;
    case Type.GasolineMotor:
      return gasolineSvg;
    case Type.TurningDiameter:
      return forceSvg;
    case Type.ElectricMotor:
      return energy;
    case Type.HybridMotor:
      return hybrid;
    default:
      return spedSvg;
  }
};
