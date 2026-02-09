export interface City {
  country_code: string;
  state_code: string;
  name: string;
  city_code: string;
  is_country_capital: boolean;
  is_state_capital: boolean;
  coordinates: {
    lat: number;
    long: number;
  };
  timezone: {
    utc: string;
    name: string;
  };
  timezone_name: string;
  population: number;
}

export const cities: City[] = [
  {
    country_code: 'US',
    state_code: 'CA',
    name: 'Los Angeles',
    city_code: 'LA',
    is_country_capital: false,
    is_state_capital: false,
    coordinates: { lat: 34.0522, long: -118.2437 },
    timezone: { utc: '-8', name: 'PST' },
    timezone_name: 'Pacific Standard Time',
    population: 3980400,
  },
  {
    country_code: 'US',
    state_code: 'CA',
    name: 'Sacramento',
    city_code: 'SAC',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: 38.575764, long: -121.478851 },
    timezone: { utc: '-8', name: 'PST' },
    timezone_name: 'Pacific Standard Time',
    population: 513624,
  },
  {
    country_code: 'US',
    state_code: 'NY',
    name: 'New York City',
    city_code: 'NYC',
    is_country_capital: false,
    is_state_capital: false,
    coordinates: { lat: 40.7128, long: -74.006 },
    timezone: { utc: '-5', name: 'EST' },
    timezone_name: 'Eastern Standard Time',
    population: 8419600,
  },
  {
    country_code: 'US',
    state_code: 'NY',
    name: 'Albany',
    city_code: 'ALB',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: 42.6526, long: -73.7562 },
    timezone: { utc: '-5', name: 'EST' },
    timezone_name: 'Eastern Standard Time',
    population: 97856,
  },
  {
    country_code: 'US',
    state_code: 'DC',
    name: 'Washington D.C.',
    city_code: 'DC',
    is_country_capital: true,
    is_state_capital: true,
    coordinates: { lat: 38.89511, long: -77.03637 },
    timezone: { utc: '-5', name: 'EST' },
    timezone_name: 'Eastern Standard Time',
    population: 705749,
  },
  {
    country_code: 'JP',
    state_code: 'JP-13',
    name: 'Tokyo',
    city_code: 'TKY',
    is_country_capital: true,
    is_state_capital: true,
    coordinates: { lat: 35.6895, long: 139.6917 },
    timezone: { utc: '+9', name: 'JST' },
    timezone_name: 'Japan Standard Time',
    population: 13929286,
  },
  {
    country_code: 'JP',
    state_code: 'JP-13',
    name: 'Hachioji',
    city_code: 'HAC',
    is_country_capital: false,
    is_state_capital: false,
    coordinates: { lat: 35.655, long: 139.3239 },
    timezone: { utc: '+9', name: 'JST' },
    timezone_name: 'Japan Standard Time',
    population: 577513,
  },
  {
    country_code: 'JP',
    state_code: 'JP-27',
    name: 'Osaka',
    city_code: 'OSK',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: 34.6937, long: 135.5023 },
    timezone: { utc: '+9', name: 'JST' },
    timezone_name: 'Japan Standard Time',
    population: 2715000,
  },
  {
    country_code: 'GB',
    state_code: 'GB-ENG',
    name: 'London',
    city_code: 'LON',
    is_country_capital: true,
    is_state_capital: true,
    coordinates: { lat: 51.5072, long: -0.1276 },
    timezone: { utc: '0', name: 'GMT' },
    timezone_name: 'Greenwich Mean Time',
    population: 8982000,
  },
  {
    country_code: 'DE',
    state_code: 'DE-BY',
    name: 'Munich',
    city_code: 'MUC',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: 48.1351, long: 11.582 },
    timezone: { utc: '+1', name: 'CET' },
    timezone_name: 'Central European Time',
    population: 1472000,
  },
  {
    country_code: 'IN',
    state_code: 'IN-MH',
    name: 'Mumbai',
    city_code: 'MUM',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: 19.076, long: 72.8777 },
    timezone: { utc: '+5:30', name: 'IST' },
    timezone_name: 'Indian Standard Time',
    population: 12478447,
  },
  {
    country_code: 'AU',
    state_code: 'NSW',
    name: 'Sydney',
    city_code: 'SYD',
    is_country_capital: false,
    is_state_capital: true,
    coordinates: { lat: -33.8688, long: 151.2093 },
    timezone: { utc: '+10', name: 'AEST' },
    timezone_name: 'Australian Eastern Standard Time',
    population: 5312163,
  }
];