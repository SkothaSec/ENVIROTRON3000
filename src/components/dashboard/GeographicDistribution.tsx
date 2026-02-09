import { Card, CardContent, Typography, Box } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { SimulatedUser } from '../../types/User';
import { Network } from '../../types/Network';
import 'leaflet/dist/leaflet.css';

interface Props {
  users: SimulatedUser[];
  infrastructure: Network[];
}

export default function GeographicDistribution({ users, infrastructure }: Props) {
  // Aggregate users by location
  const locationData = users.reduce((acc, user) => {
    if (!user.location?.coordinates?.lat || !user.location?.coordinates?.long ||
        isNaN(user.location.coordinates.lat) || isNaN(user.location.coordinates.long)) {
      return acc;
    }
    const key = `${user.location.coordinates.lat},${user.location.coordinates.long}`;
    if (!acc[key]) {
      acc[key] = {
        coordinates: user.location.coordinates,
        users: 0,
        machines: 0,
        location: `${user.location.city}, ${user.location.country_code}`,
      };
    }
    acc[key].users++;
    return acc;
  }, {} as Record<string, any>);

  // Add infrastructure data
  infrastructure.forEach(network => {
    network.machines.forEach(machine => {
      if (!machine.location?.coordinates?.lat || !machine.location?.coordinates?.long ||
          isNaN(machine.location.coordinates.lat) || isNaN(machine.location.coordinates.long)) {
        return;
      }
      const key = `${machine.location.coordinates.lat},${machine.location.coordinates.long}`;
      if (!locationData[key]) {
        locationData[key] = {
          coordinates: machine.location.coordinates,
          users: 0,
          machines: 0,
          location: `${machine.location.city}, ${machine.location.country_code}`,
        };
      }
      locationData[key].machines++;
    });
  });

  const validLocations = Object.values(locationData).filter(
    data => typeof data.coordinates?.lat === 'number' && 
           typeof data.coordinates?.long === 'number' &&
           !isNaN(data.coordinates.lat) && 
           !isNaN(data.coordinates.long)
  );

  if (validLocations.length === 0) {
    return (
      <Card elevation={0}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Geographic Distribution
          </Typography>
          <Typography>No valid location data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const defaultCenter: [number, number] = [20, 0];

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Geographic Distribution
        </Typography>
        <Box sx={{ height: 500 }}>
          <MapContainer
            center={defaultCenter}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validLocations.map((data, index) => {
              if (!data.coordinates?.lat || !data.coordinates?.long ||
                  isNaN(data.coordinates.lat) || isNaN(data.coordinates.long)) {
                return null;
              }

              const position: [number, number] = [data.coordinates.lat, data.coordinates.long];
              const radius = Math.log(data.users + data.machines + 1) * 4;

              return (
                <CircleMarker
                  key={index}
                  center={position}
                  radius={radius}
                  pathOptions={{
                    fillColor: "#2196f3",
                    color: "#ffffff",
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.6
                  }}
                >
                  <Tooltip>
                    <div>
                      <strong>{data.location}</strong>
                      <br />
                      Users: {data.users}
                      <br />
                      Machines: {data.machines}
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </Box>
      </CardContent>
    </Card>
  );
}