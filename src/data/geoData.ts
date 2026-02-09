import { cities, City } from './geo/cities';
import { states, State } from './geo/states';
import { countries, Country } from './geo/countries';

export interface GeoData {
  cities: City[];
  states: State[];
  countries: Country[];
}

export const geoData: GeoData = {
  cities,
  states,
  countries
};

export { cities, states, countries };
export type { City, State, Country };