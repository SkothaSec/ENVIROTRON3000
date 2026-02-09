import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { LogEvent } from '../../../types/LogEvent';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useRef } from 'react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LogsOverTimeChartProps = {
  logs: LogEvent[];
};

export const LogsOverTimeChart = ({ logs }: LogsOverTimeChartProps) => {
  const chartRef = useRef<ChartJS<'line', number[], unknown>>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!Array.isArray(logs)) return null;

  // Aggregate logs per hour (or you can do per day)
  const logCounts: Record<string, number> = {};
  logs.forEach((log) => {
    const time = new Date(log.timestamp);
    const key = time.toISOString().split('T')[0]; // daily key
    logCounts[key] = (logCounts[key] || 0) + 1;
  });

  const labels = Object.keys(logCounts).sort();
  const data = {
    labels,
    datasets: [
      {
        label: 'Logs Over Time',
        data: labels.map((label) => logCounts[label]),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.2,
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Logs Over Time
      </Typography>
      <Line ref={chartRef} data={data} />
    </Paper>
  );
};