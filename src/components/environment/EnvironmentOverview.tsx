import { Box, Typography, Grid, Card, CardContent, Chip, Stack, Divider } from '@mui/material';
import { useSimulatorStore } from '../../store/simulatorStore';
import { countries } from '../../data/geoData';
import { dataSourceDefinitions } from '../../data/dataSources';

export default function EnvironmentOverview() {
  const { orgData, users, infrastructure, logsBySource } = useSimulatorStore();

  if (!orgData || !users || !infrastructure || !logsBySource) {
    return null;
  }

  const totalMachines = infrastructure.reduce((acc, net) => acc + net.machines.length, 0);
  const remoteUsers = users.filter(u => u.is_remote).length;
  const totalLogs = Object.values(logsBySource).reduce((acc, logs) => acc + logs.length, 0);

  // Helper function to determine if a data source needs instances
  const needsInstances = (source: string) => {
    return ['windows', 'linux', 'macos', 'firewall', 'dns', 'proxy', 'email', 'database', 'monitoring'].includes(source);
  };

  return (
    <Box>
      {/* Organization Overview */}
      <Card className="gradient-border glow" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom className="glow-text">
            {orgData.orgName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Enterprise Environment Overview
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Users
                </Typography>
                <Typography variant="h4" className="glow-text">
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {remoteUsers} Remote Users ({Math.round((remoteUsers / users.length) * 100)}%)
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Infrastructure
                </Typography>
                <Typography variant="h4" className="glow-text">
                  {totalMachines}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {infrastructure.length} Networks
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Log Volume
                </Typography>
                <Typography variant="h4" className="glow-text">
                  {totalLogs}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 24 Hours
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card className="gradient-border glow" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Geographic Distribution
          </Typography>
          <Grid container spacing={2}>
            {orgData.locations.map(code => {
              const country = countries.find(c => c.country_code === code);
              const countryUsers = users.filter(u => u.location.country_code === code);
              const countryMachines = infrastructure
                .flatMap(net => net.machines)
                .filter(m => m.location.country_code === code);

              return (
                <Grid item xs={12} sm={6} md={4} key={code}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {country?.name}
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Users
                          </Typography>
                          <Typography variant="h6">
                            {countryUsers.length}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Infrastructure
                          </Typography>
                          <Typography variant="h6">
                            {countryMachines.length}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card className="gradient-border glow">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Active Data Sources
          </Typography>
          <Grid container spacing={3}>
            {orgData.dataSources.map(source => {
              const def = dataSourceDefinitions[source];
              const sourceCount = infrastructure
                .flatMap(net => net.machines)
                .filter(m => m.role === source).length;
              const logCount = logsBySource[source]?.length || 0;

              return (
                <Grid item xs={12} sm={6} md={4} key={source}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {def.icon && (
                          <img 
                            src={def.icon} 
                            alt={def.displayName}
                            style={{ width: 32, height: 32 }}
                          />
                        )}
                        <Typography variant="subtitle1">
                          {def.displayName}
                        </Typography>
                      </Box>
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip 
                            label={def.type}
                            size="small"
                            sx={{ bgcolor: 'primary.dark' }}
                          />
                          <Chip 
                            label={def.os}
                            size="small"
                            sx={{ bgcolor: 'secondary.dark' }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {def.description}
                        </Typography>
                        <Stack spacing={0.5}>
                          {needsInstances(source) && (
                            <Typography variant="body2">
                              Active Instances: {sourceCount}
                            </Typography>
                          )}
                          <Typography variant="body2">
                            Logs (24h): {logCount}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}