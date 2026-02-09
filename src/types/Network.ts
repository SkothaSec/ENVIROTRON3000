import { SimulatedMachine } from './Machine';
import { LocationInfo } from './LocationInfo';
export interface Network {
  name: string;
  subnet: string;
  type: 'workstation' | 'infrastructure';
  location: LocationInfo;
  machines: SimulatedMachine[];
}
