import { Box, Typography, Grid, Paper } from '@mui/material';
interface Props {
  users: any[];
  infrastructure: { machines: any[] }[];
  logs: any[];
}
export default function EnvironmentSummaryPanel({
  users,
  infrastructure,
  logs,
}: Props) {
  const totalHosts = infrastructure.reduce(
    (acc, net) => acc + net.machines.length,
    0
  );
  const metrics = [
    { label: 'Users', value: users.length },
    { label: 'Hosts', value: totalHosts },
    { label: 'Logs', value: logs.length },
  ];
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Environment Summary
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.label}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">{metric.value}</Typography>
              <Typography variant="subtitle1">{metric.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
