import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import { LogEvent } from '../../types/LogEvent';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  logs: Record<string, LogEvent[]>;
}

export default function SecurityMetrics({ logs }: Props) {
  const chartRef = useRef<ChartJS<'bar', number[], unknown>>(null);
  const allLogs = Object.values(logs).flat();
  
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate severity distribution
  const severityData = {
    Critical: allLogs.filter(log => log.severity === 'Critical').length,
    Warning: allLogs.filter(log => log.severity === 'Warning').length,
    Info: allLogs.filter(log => log.severity === 'Info').length,
  };

  const chartData = {
    labels: Object.keys(severityData),
    datasets: [
      {
        label: 'Log Count',
        data: Object.values(severityData),
        backgroundColor: ['#f44336', '#ff9800', '#2196f3'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Security Overview
        </Typography>
        <Box sx={{ height: 300 }}>
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}