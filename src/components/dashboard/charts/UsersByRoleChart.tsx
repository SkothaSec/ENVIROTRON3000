import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  data: Record<string, number>;
}
export default function UsersByRoleChart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc'],
      },
    ],
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Users by Role
      </Typography>
      <Pie data={chartData} />
    </Box>
  );
}
