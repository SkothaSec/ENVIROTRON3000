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
export default function LogsBySeverityChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Log Count',
        data: values,
        backgroundColor: '#42a5f5',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Logs by Severity' },
    },
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Logs by Severity
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
