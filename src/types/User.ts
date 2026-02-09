import { LocationInfo } from './LocationInfo';
export interface SimulatedUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  location: LocationInfo;
  is_remote: boolean;
  is_foreign: boolean;
}
