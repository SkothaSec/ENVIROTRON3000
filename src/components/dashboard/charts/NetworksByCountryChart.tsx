import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  data: Record<string, number>;
}
export default function NetworksByCountryChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#26c6da', '#ff7043', '#9575cd', '#9ccc65'],
      },
    ],
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Networks by Country
      </Typography>
      <Doughnut data={chartData} />
    </Box>
  );
}
