import { Grid } from '@mui/material';
import { useSimulatorStore } from '../../store/simulatorStore';

// Import existing dashboard components
import SecurityMetrics from './SecurityMetrics';
import InfrastructureOverview from './InfrastructureOverview';
import UserAnalytics from './UserAnalytics';
import LogAnalytics from './LogAnalytics';
import ActivityTimeline from './ActivityTimeline';
import GeographicDistribution from './GeographicDistribution';
import MetricCards from '../dashboard/MetricCards';
import AlertsWidget from './AlertsWidget';

export default function ExecutiveOverview() {
  const { users, infrastructure, logsBySource } = useSimulatorStore();

  if (!users || !infrastructure || !logsBySource) return null;

  return (
    <Grid container spacing={3}>
      {/* Key Metrics */}
      <Grid item xs={12}>
        <MetricCards 
          users={users}
          infrastructure={infrastructure}
          logsBySource={logsBySource}
        />
      </Grid>

      {/* Alerts Widget */}
      <Grid item xs={12}>
        <AlertsWidget logs={logsBySource} />
      </Grid>

      {/* Geographic Distribution */}
      <Grid item xs={12}>
        <GeographicDistribution users={users} infrastructure={infrastructure} />
      </Grid>

      {/* Security and Infrastructure */}
      <Grid item xs={12} md={6}>
        <SecurityMetrics logs={logsBySource} />
      </Grid>

      <Grid item xs={12} md={6}>
        <InfrastructureOverview infrastructure={infrastructure} />
      </Grid>

      {/* User Analytics and Log Analytics */}
      <Grid item xs={12} md={6}>
        <UserAnalytics users={users} />
      </Grid>

      <Grid item xs={12} md={6}>
        <LogAnalytics logs={logsBySource} />
      </Grid>

      {/* Activity Timeline */}
      <Grid item xs={12}>
        <ActivityTimeline logs={Object.values(logsBySource).flat()} />
      </Grid>
    </Grid>
  );
}