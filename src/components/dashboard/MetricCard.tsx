import { Card, CardContent, Typography } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  alert?: boolean;
}

export default function MetricCard({ title, value, subtitle, alert }: MetricCardProps) {
  return (
    <Card 
      className={`gradient-border glow${alert ? ' alert' : ''}`}
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color="text.secondary" fontSize="0.875rem">
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="500" className="glow-text">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}