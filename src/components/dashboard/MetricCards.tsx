import { Grid } from '@mui/material';
import { SimulatedUser } from '../../types/User';
import { Network } from '../../types/Network';
import { LogEvent } from '../../types/LogEvent';
import MetricCard from '../dashboard/MetricCard';

interface MetricCardsProps {
  users: SimulatedUser[];
  infrastructure: Network[];
  logsBySource: Record<string, LogEvent[]>;
}

export default function MetricCards({ users, infrastructure, logsBySource }: MetricCardsProps) {
  const allLogs = Object.values(logsBySource).flat();
  const criticalLogs = allLogs.filter(log => log.severity === 'Critical').length;
  const totalMachines = infrastructure.reduce((acc, net) => acc + net.machines.length, 0);
  const remoteUsers = users.filter(u => u.is_remote).length;
  
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Total Users"
          value={users.length}
          subtitle={`${remoteUsers} Remote Users`}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Infrastructure"
          value={totalMachines}
          subtitle={`${infrastructure.length} Networks`}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Critical Alerts"
          value={criticalLogs}
          subtitle="Last 24 Hours"
          alert={criticalLogs > 0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="System Health"
          value={`${Math.round((1 - criticalLogs / allLogs.length) * 100)}%`}
          subtitle="Based on log severity"
        />
      </Grid>
    </Grid>
  );
}