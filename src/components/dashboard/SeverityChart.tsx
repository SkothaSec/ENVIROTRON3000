import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Box, Typography } from '@mui/material';
interface SeverityChartProps {
  data: Record<string, number>;
}
export default function SeverityChart({ data }: SeverityChartProps) {
  const chartData = Object.entries(data).map(([severity, count]) => ({
    severity,
    count,
  }));
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Logs by Severity
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="severity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
