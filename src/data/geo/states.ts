export interface State {
  name: string;
  state_code: string;
  country_code: string;
  capital_coords: [number, number];
  population: number;
}

export const states: State[] = [
  {
    name: 'California',
    state_code: 'CA',
    country_code: 'US',
    capital_coords: [38.575764, -121.478851],
    population: 39538223,
  },
  {
    name: 'New York',
    state_code: 'NY',
    country_code: 'US',
    capital_coords: [42.6526, -73.7562],
    population: 20201249,
  },
  {
    name: 'Tokyo Prefecture',
    state_code: 'JP-13',
    country_code: 'JP',
    capital_coords: [35.6895, 139.6917],
    population: 13929286,
  },
  {
    name: 'New South Wales',
    state_code: 'NSW',
    country_code: 'AU',
    capital_coords: [-33.8688, 151.2093],
    population: 8166400,
  },
  {
    name: 'England',
    state_code: 'GB-ENG',
    country_code: 'GB',
    capital_coords: [51.5072, -0.1276],
    population: 56286961,
  },
  {
    name: 'Bavaria',
    state_code: 'DE-BY',
    country_code: 'DE',
    capital_coords: [48.1351, 11.582],
    population: 13124737,
  },
  {
    name: 'Maharashtra',
    state_code: 'IN-MH',
    country_code: 'IN',
    capital_coords: [19.076, 72.8777],
    population: 123144223,
  }
];