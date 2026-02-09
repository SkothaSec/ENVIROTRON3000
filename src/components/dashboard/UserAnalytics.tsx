import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { SimulatedUser } from '../../types/User';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  users: SimulatedUser[];
}

export default function UserAnalytics({ users }: Props) {
  // Calculate department distribution
  const departmentData = users.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate role distribution
  const roleData = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        data: Object.values(departmentData),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#9C27B0',
          '#FF9800',
          '#F44336',
          '#00BCD4',
          '#795548',
        ],
      },
    ],
  };

  const roleChartData = {
    labels: Object.keys(roleData),
    datasets: [
      {
        data: Object.values(roleData),
        backgroundColor: [
          '#E91E63',
          '#673AB7',
          '#3F51B5',
          '#009688',
          '#FFC107',
          '#FF5722',
          '#607D8B',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Distribution
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" align="center" gutterBottom>
              By Department
            </Typography>
            <Box sx={{ height: 200 }}>
              <Pie data={departmentChartData} options={chartOptions} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" align="center" gutterBottom>
              By Role
            </Typography>
            <Box sx={{ height: 200 }}>
              <Pie data={roleChartData} options={chartOptions} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}