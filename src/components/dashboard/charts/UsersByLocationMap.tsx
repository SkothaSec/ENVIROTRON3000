import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { countries } from '../../../data/geoData';
import 'leaflet/dist/leaflet.css';

interface Props {
  data: Record<string, number>;
}

export default function UsersByLocationMap({ data }: Props) {
  const validEntries = Object.entries(data).filter(([country]) => 
    countries.find(c => c.country_code === country)
  );

  if (validEntries.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Users by Country (Map)
        </Typography>
        <Typography>No valid location data available</Typography>
      </Box>
    );
  }

  const center: [number, number] = [20, 0];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Users by Country (Map)
      </Typography>
      <MapContainer
        center={center}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validEntries.map(([countryCode, count]) => {
          const country = countries.find(c => c.country_code === countryCode);
          if (!country?.coordinates?.lat || !country?.coordinates?.long || 
              isNaN(country.coordinates.lat) || isNaN(country.coordinates.long)) {
            return null;
          }
          
          const position: [number, number] = [country.coordinates.lat, country.coordinates.long];
          
          return (
            <CircleMarker
              key={countryCode}
              center={position}
              radius={Math.log(count + 1) * 4}
              pathOptions={{
                fillColor: '#2196f3',
                color: '#ffffff',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.6
              }}
            >
              <Tooltip>
                <span>{`${country.name}: ${count}`}</span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </Box>
  );
}