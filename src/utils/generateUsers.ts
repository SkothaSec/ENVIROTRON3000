import { faker } from '@faker-js/faker';
import { OrgConfig } from '../types/OrgConfig';
import { SimulatedUser } from '../types/User';
import { departments, departmentRoles } from '../data/departmentsAndRoles';
import { cities } from '../data/geoData';

export function generateUsers(config: OrgConfig): SimulatedUser[] {
  const users: SimulatedUser[] = [];
  const size = config.userCount || 10;
  const hqCountries = config.locations?.length ? config.locations : ['US'];
  const isRemoteEnabled = config.enableRemoteUsers ?? false;

  // Pre-process cities by country
  const citiesByCountry = new Map<string, typeof cities>();
  
  // Only include cities from selected countries
  hqCountries.forEach(countryCode => {
    const countryCities = cities.filter(city => city.country_code === countryCode);
    if (countryCities.length > 0) {
      citiesByCountry.set(countryCode, countryCities);
    }
  });

  // Get capital cities for each country
  const capitalsByCountry = new Map<string, typeof cities[0]>();
  hqCountries.forEach(countryCode => {
    const capital = cities.find(city => 
      city.country_code === countryCode && 
      (city.is_country_capital || city.is_state_capital)
    );
    if (capital) {
      capitalsByCountry.set(countryCode, capital);
    }
  });

  for (let i = 0; i < size; i++) {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const name = `${first} ${last}`;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@${config.orgName
      .replace(/\s+/g, '')
      .toLowerCase()}.com`;

    const department = faker.helpers.arrayElement(
      config.departments?.length ? config.departments : departments
    );
    const roleList = departmentRoles[department] || ['Employee'];
    const role = faker.helpers.arrayElement(roleList);

    // Determine remote status
    const isRemote = isRemoteEnabled && Math.random() < 0.2;

    // Select country and city
    let selectedCountry = faker.helpers.arrayElement(hqCountries);
    let selectedCity;

    if (isRemote) {
      // Remote workers can be in any city in their country
      const availableCities = citiesByCountry.get(selectedCountry);
      if (availableCities && availableCities.length > 0) {
        selectedCity = faker.helpers.arrayElement(availableCities);
      }
    } else {
      // Non-remote workers must be in capital cities
      selectedCity = capitalsByCountry.get(selectedCountry);
    }

    // Fallback to first available capital if no city found
    if (!selectedCity) {
      const firstCapital = Array.from(capitalsByCountry.values())[0];
      if (firstCapital) {
        selectedCity = firstCapital;
        selectedCountry = firstCapital.country_code;
      } else {
        console.error('No valid cities found for user generation');
        continue;
      }
    }

    const user: SimulatedUser = {
      id: faker.string.uuid(),
      name,
      email,
      department,
      role,
      location: {
        city: selectedCity.name,
        state_code: selectedCity.state_code,
        country_code: selectedCity.country_code,
        timezone: selectedCity.timezone_name,
        coordinates: selectedCity.coordinates,
      },
      is_remote: isRemote,
      is_foreign: false,
    };

    users.push(user);
  }

  return users;
}