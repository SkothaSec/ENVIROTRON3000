import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import { LogEvent } from '../../types/LogEvent';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  logs: Record<string, LogEvent[]>;
}

export default function LogAnalytics({ logs }: Props) {
  const chartRef = useRef<ChartJS<'line', number[], unknown>>(null);
  const allLogs = Object.values(logs).flat();

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Group logs by hour
  const hourlyData = allLogs.reduce((acc, log) => {
    const hour = new Date(log.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Log Volume',
        data: Array.from({ length: 24 }, (_, i) => hourlyData[i] || 0),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.4,
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
          Log Activity (24h)
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}