import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Typography } from '@mui/material';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  data: Record<string, number>;
}

export default function HostsByNetworkChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Host Count',
        data: values,
        backgroundColor: '#7e57c2',
      },
    ],
  };
  
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Hosts by Network
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}