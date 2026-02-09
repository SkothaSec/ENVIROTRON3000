import { machineProfiles } from '../data/machineProfiles';
import { networkProfiles, networkToMachineTypes } from '../data/networkProfiles';
import { SimulatedUser } from '../types/User';
import { OrgConfig } from '../types/OrgConfig';
import { Network } from '../types/Network';
import { getRandomIpInSubnet } from './generateIp';
import { cities } from '../data/geoData';

export function generateInfrastructure(
  config: OrgConfig,
  users: SimulatedUser[]
): Network[] {
  const infrastructure: Network[] = [];
  const locationGroups: { [key: string]: SimulatedUser[] } = {};

  // Get capital cities for infrastructure placement
  const capitalCities = cities.filter(city => 
    config.locations.includes(city.country_code) && 
    (city.is_country_capital || city.is_state_capital)
  );

  if (capitalCities.length === 0) {
    console.error('No capital cities found for infrastructure placement');
    return [];
  }

  // Group users by location
  users.forEach((user) => {
    if (!user.location) return;
    const locKey = `${user.location.city}-${user.location.state_code}-${user.location.country_code}`;
    if (!locationGroups[locKey]) {
      locationGroups[locKey] = [];
    }
    locationGroups[locKey].push(user);
  });

  // Create workstation networks for each location
  Object.entries(locationGroups).forEach(([, locationUsers]) => {
    const firstUser = locationUsers[0];
    if (!firstUser?.location) return;

    if (!config.locations.includes(firstUser.location.country_code)) {
      return;
    }

    const workstationNetwork: Network = {
      name: `Workstation Network (${firstUser.location.city})`,
      type: 'workstation',
      subnet: networkProfiles.workstation.subnet,
      location: { ...firstUser.location },
      machines: locationUsers.map((user) => ({
        hostname: `ws-${user.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        ip: getRandomIpInSubnet(networkProfiles.workstation.subnet),
        network: networkProfiles.workstation.name,
        subnet: networkProfiles.workstation.subnet,
        type: 'WORKSTATION',
        role: 'workstation',
        owner: user,
        location: { ...user.location },
      })),
    };
    infrastructure.push(workstationNetwork);
  });

  // Create infrastructure networks in capital cities
  capitalCities.forEach(capital => {
    // Create a network for each network type
    Object.entries(networkProfiles).forEach(([networkType, profile]) => {
      if (networkType === 'workstation') return; // Skip workstation network as it's handled above

      const network: Network = {
        name: `${profile.name} (${capital.name})`,
        type: 'infrastructure',
        subnet: profile.subnet,
        location: {
          city: capital.name,
          state_code: capital.state_code,
          country_code: capital.country_code,
          timezone: capital.timezone_name,
          coordinates: capital.coordinates,
        },
        machines: [],
      };

      // Get machine types appropriate for this network
      const allowedMachineTypes = networkToMachineTypes[networkType] || [];

      // For each data source that matches the allowed machine types
      config.dataSources.forEach(source => {
        if (allowedMachineTypes.includes(source)) {
          // Get machine profiles for this source
          const profiles = machineProfiles[source] || [];
          
          // Create machines for each profile
          profiles.forEach(profile => {
            network.machines.push({
              hostname: `${profile.toLowerCase()}-${capital.city_code.toLowerCase()}`,
              ip: getRandomIpInSubnet(network.subnet),
              network: network.name,
              subnet: network.subnet,
              type: profile,
              role: source,
              owner: null,
              location: {
                city: capital.name,
                state_code: capital.state_code,
                country_code: capital.country_code,
                timezone: capital.timezone_name,
                coordinates: capital.coordinates,
              },
            });
          });
        }
      });

      // Only add networks that have machines
      if (network.machines.length > 0) {
        infrastructure.push(network);
      }
    });
  });

  return infrastructure;
}