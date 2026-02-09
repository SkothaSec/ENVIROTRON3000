import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: Record<string, number>;
}

export default function HostsByRoleChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Hosts',
        data: values,
        backgroundColor: '#ffa726',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hosts by Role / Source Type',
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Hosts by Role
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}