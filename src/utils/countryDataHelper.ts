import { cities, states, countries } from '../data/geoData'; // or wherever you're exporting them from
export function countryData(countryCode: string) {
  const country = countries.find((c) => c.country_code === countryCode);
  if (!country) return null;
  const filteredStates = states.filter(
    (state) => state.country_code === countryCode
  );
  const updatedStates = filteredStates.map((state) => {
    const stateCities = cities.filter(
      (city) =>
        city.country_code === countryCode &&
        city.state_code === state.state_code
    );
    const capitalCity =
      stateCities.find((c) => c.is_state_capital)?.name || null;
    return {
      ...state,
      cities: stateCities,
      capital_city: capitalCity,
    };
  });
  const countryCapital =
    cities.find(
      (city) => city.country_code === countryCode && city.is_country_capital
    )?.name || null;
  return {
    ...country,
    states: updatedStates,
    country_capital: countryCapital,
  };
}
