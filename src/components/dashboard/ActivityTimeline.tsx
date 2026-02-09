import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Chip } from '@mui/material';
import { LogEvent, LogSeverity, LogSourceDisplayNames } from '../../types/LogEvent';

interface Props {
  logs: LogEvent[];
}

export default function ActivityTimeline({ logs }: Props) {
  // Sort logs by timestamp (most recent first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 10);

  const getSeverityColor = (severity: LogSeverity) => {
    switch (severity) {
      case 'Critical': return 'error';
      case 'Warning': return 'warning';
      case 'Info': return 'info';
    }
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {sortedLogs.map((log, index) => (
            <ListItem
              key={index}
              divider={index < sortedLogs.length - 1}
              sx={{ py: 2 }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={log.severity}
                      color={getSeverityColor(log.severity)}
                      size="small"
                    />
                    <Typography component="span" variant="body1">
                      {LogSourceDisplayNames[log.dataSource]} - {log.user}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}