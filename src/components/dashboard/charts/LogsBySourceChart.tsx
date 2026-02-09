import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  data: Record<string, number>;
}
export default function LogsBySourceChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#29b6f6', '#ef5350', '#ffee58', '#66bb6a'],
      },
    ],
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Logs by Source
      </Typography>
      <Doughnut data={chartData} />
    </Box>
  );
}
