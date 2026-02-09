export interface Country {
  name: string;
  country_code: string;
  population: number;
  coordinates: {
    lat: number;
    long: number;
  };
}

export const countries: Country[] = [
  {
    name: 'United States of America',
    country_code: 'US',
    population: 331002651,
    coordinates: { lat: 37.0902, long: -95.7129 }
  },
  {
    name: 'Japan',
    country_code: 'JP',
    population: 126476461,
    coordinates: { lat: 36.2048, long: 138.2529 }
  },
  {
    name: 'Australia',
    country_code: 'AU',
    population: 25687041,
    coordinates: { lat: -25.2744, long: 133.7751 }
  },
  {
    name: 'United Kingdom',
    country_code: 'GB',
    population: 68207116,
    coordinates: { lat: 55.3781, long: -3.436 }
  },
  {
    name: 'Germany',
    country_code: 'DE',
    population: 83240525,
    coordinates: { lat: 51.1657, long: 10.4515 }
  },
  {
    name: 'India',
    country_code: 'IN',
    population: 1380004385,
    coordinates: { lat: 20.5937, long: 78.9629 }
  }
];