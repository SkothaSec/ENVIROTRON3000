import { SimulatedUser } from './User';
import { LocationInfo } from './LocationInfo.ts';

export interface SimulatedMachine {
  hostname: string;
  ip: string;
  network: string;
  subnet: string;
  type: string;
  role: string;
  owner: SimulatedUser | null;
  location: LocationInfo;
}

export interface Network {
  name: string;
  subnet: string;
  location?: LocationInfo;
  type: 'workstations' | 'infrastructure';
  machines: SimulatedMachine[];
}
