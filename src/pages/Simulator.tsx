import { useState } from 'react';
import { 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import OrgForm from '../components/OrgForm';
import { TabPanel } from '../components/TabPanel';
import UsersPanel from '../components/UsersPanel';
import InfrastructurePanel from '../components/InfrastructurePanel';
import LogsPanel from '../components/LogsPanel';
import EnvironmentOverview from '../components/environment/EnvironmentOverview';
import { useSimulatorStore } from '../store/simulatorStore';

export function Simulator() {
  const [tabIndex, setTabIndex] = useState(0);
  const { users, orgData } = useSimulatorStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue !== 0 && !users) {
      return;
    }
    setTabIndex(newValue);
  };

  const handleOrgFormComplete = () => {
    setTabIndex(1); // Switch to Environment tab
  };

  const tabs = [
    <Tab key="setup" label="Setup" />,
    ...(orgData ? [
      <Tab key="environment" label="Environment" />,
      <Tab key="users" label="Users" />,
      <Tab key="infrastructure" label="Infrastructure" />,
      <Tab key="logs" label="Logs" />
    ] : [])
  ];

  return (
    <Box className="cyber-grid" sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        className="glow-text"
        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
      >
        Environment Simulator
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Card className="gradient-border">
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                minWidth: isMobile ? 'auto' : 120,
                fontSize: isMobile ? '0.875rem' : '1rem',
                fontWeight: 500,
                px: isMobile ? 2 : 3,
              }
            }}
          >
            {tabs}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            <TabPanel value={tabIndex} index={0}>
              <OrgForm onComplete={handleOrgFormComplete} />
            </TabPanel>
            {orgData && (
              <>
                <TabPanel value={tabIndex} index={1}>
                  <EnvironmentOverview />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                  <UsersPanel />
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                  <InfrastructurePanel />
                </TabPanel>
                <TabPanel value={tabIndex} index={4}>
                  <LogsPanel />
                </TabPanel>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}