import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import { Network } from '../../types/Network';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  infrastructure: Network[];
}

export default function InfrastructureOverview({ infrastructure }: Props) {
  const chartRef = useRef<ChartJS<'doughnut', number[], unknown>>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate machine distribution by type
  const machineTypes = infrastructure
    .flatMap(net => net.machines)
    .reduce((acc, machine) => {
      acc[machine.type] = (acc[machine.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(machineTypes),
    datasets: [
      {
        data: Object.values(machineTypes),
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
          Infrastructure Distribution
        </Typography>
        <Box sx={{ height: 300 }}>
          <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}