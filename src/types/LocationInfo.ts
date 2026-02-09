export interface LocationInfo {
  city: string;
  state_code: string;
  country_code: string;
  timezone: string;
  coordinates: {
    lat: number;
    long: number;
  };
}
