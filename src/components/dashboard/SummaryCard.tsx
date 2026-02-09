import { Card, CardContent, Divider, Typography } from '@mui/material';
interface Props {
  title: string;
  data: Record<string, number>;
}
export default function SummaryCard({ title, data }: Props) {
  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {Object.entries(data).map(([label, count]) => (
          <Typography key={label} variant="body2">
            {label}: {count}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
