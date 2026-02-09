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
export default function UsersByLocationChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: values,
        backgroundColor: '#66bb6a',
      },
    ],
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Users by Location
      </Typography>
      <Bar data={chartData} options={{ responsive: true }} />
    </Box>
  );
}
