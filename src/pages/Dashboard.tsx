import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent } from '@mui/material';
import { useSimulatorStore } from '../store/simulatorStore';
import { TabPanel } from '../components/TabPanel';
import ExecutiveOverview from '../components/dashboard/ExecutiveOverview';
import LogAnalysisView from '../components/dashboard/LogAnalysisView';

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const { users, infrastructure, logsBySource, orgData } = useSimulatorStore();

  if (!users || !infrastructure || !logsBySource || !orgData) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          No environment data available
        </Typography>
        <Typography>
          Please generate an environment first using the simulator.
        </Typography>
      </Box>
    );
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box className="cyber-grid" sx={{ minHeight: '100vh', p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="500" className="glow-text">
          {orgData.orgName} Environment Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Real-time analytics and insights across your infrastructure
        </Typography>
      </Box>

      <Card className="gradient-border glow">
        <CardContent>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange}
            sx={{
              mb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 500,
              }
            }}
          >
            <Tab label="Executive Overview" />
            <Tab label="Log Analysis" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <ExecutiveOverview />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <LogAnalysisView />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}

export { Dashboard };