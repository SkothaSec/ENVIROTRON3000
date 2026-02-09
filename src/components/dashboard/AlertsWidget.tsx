import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import BiotechIcon from '@mui/icons-material/Biotech';
import CloseIcon from '@mui/icons-material/Close';
import { ThreatIntelligence } from '../../types/ThreatIntelligence';
import { LogEvent, LogSourceDisplayNames, LogSource } from '../../types/LogEvent';
import { threats, detectThreats } from '../../data/threats';
import { dataSourceDefinitions } from '../../data/dataSources';

interface AlertsWidgetProps {
  logs: Record<string, LogEvent[]>;
}

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  threat: ThreatIntelligence;
  matchedLogs: LogEvent[];
}

function AlertModal({ open, onClose, threat, matchedLogs }: AlertModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const columns: GridColDef[] = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 180,
      valueFormatter: (params: GridValueFormatterParams) => {
        const timestamp = params.value;
        if (!timestamp) return '';
        try {
          const date = new Date(timestamp as string);
          if (isNaN(date.getTime())) return 'Invalid Date';
          return date.toLocaleString();
        } catch (e) {
          return 'Invalid Date';
        }
      },
    },
    {
      field: 'severity',
      headerName: 'Severity',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Critical' ? 'error' :
            params.value === 'Warning' ? 'warning' : 'info'
          }
          size="small"
        />
      ),
    },
    {
      field: 'dataSource',
      headerName: 'Source',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {dataSourceDefinitions[params.value as LogSource]?.icon && (
            <img 
              src={dataSourceDefinitions[params.value as LogSource].icon} 
              alt="" 
              style={{ width: 16, height: 16 }}
            />
          )}
          {LogSourceDisplayNames[params.value as LogSource]}
        </Box>
      ),
    },
    {
      field: 'user',
      headerName: 'User',
      width: 150,
    },
    {
      field: 'sourceIP',
      headerName: 'Source IP',
      width: 130,
    },
    {
      field: 'host',
      headerName: 'Host',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
    },
    {
      field: 'result',
      headerName: 'Result',
      width: 120,
    },
  ];

  const rows = matchedLogs.map((log) => ({
    id: log.id ?? crypto.randomUUID(),
    timestamp: log.timestamp,
    severity: log.severity,
    dataSource: log.dataSource,
    user: log.user,
    sourceIP: log.sourceIP,
    host: log.host,
    action: log.action,
    result: log.result
  }));

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div">
            Threat Alert: {threat.title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Threat Details */}
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Threat Details
            </Typography>
            <Stack spacing={1}>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Description
                </Typography>
                <Typography>{threat.description}</Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Severity
                </Typography>
                <Chip 
                  label={threat.severity}
                  color={
                    threat.severity === 'Critical' ? 'error' :
                    threat.severity === 'High' ? 'warning' :
                    'info'
                  }
                  size="small"
                />
              </Box>
              {threat.mitreId && (
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    MITRE ATT&CK
                  </Typography>
                  <Link 
                    href={`https://attack.mitre.org/techniques/${threat.mitreId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'primary.main' }}
                  >
                    {threat.mitreId}
                  </Link>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Matched Logs */}
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Detected Events ({matchedLogs.length})
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                density="compact"
                sx={{
                  '& .MuiDataGrid-cell': {
                    whiteSpace: 'normal',
                    lineHeight: 'normal',
                    py: 1,
                  },
                }}
              />
            </Box>
          </Box>

          <Divider />

          {/* Detection Rules */}
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Detection Rules
            </Typography>
            <List dense>
              {threat.detectionRules.map((rule, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={rule.name}
                    secondary={
                      <Stack spacing={0.5}>
                        <Typography variant="body2">{rule.description}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Condition: {rule.condition}
                        </Typography>
                        {rule.threshold && (
                          <Typography variant="body2" color="text.secondary">
                            Threshold: {rule.threshold} events in {rule.timeWindow} minutes
                          </Typography>
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default function AlertsWidget({ logs }: AlertsWidgetProps) {
  const [selectedThreat, setSelectedThreat] = useState<ThreatIntelligence | null>(null);
  const [matchedLogs, setMatchedLogs] = useState<LogEvent[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Flatten logs into a single array
  const allLogs = Object.values(logs).flat();
  
  // Detect threats from logs
  const detectedAlerts = detectThreats(allLogs);

  const handleThreatClick = (threat: ThreatIntelligence, logs: LogEvent[]) => {
    setSelectedThreat(threat);
    setMatchedLogs(logs);
  };

  return (
    <>
      <Card className="gradient-border glow">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Active Alerts
          </Typography>
          <List>
            {detectedAlerts.map((result) => {
              const threat = threats.find(t => t.id === result.threatId);
              if (!threat) return null;

              return (
                <ListItem 
                  key={threat.id}
                  button
                  onClick={() => handleThreatClick(threat, result.matchedLogs)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? 1 : 0,
                    '&:hover': {
                      backgroundColor: 'rgba(0,245,255,0.1)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: isMobile ? 'auto' : 56 }}>
                    <BiotechIcon 
                      color={
                        threat.severity === 'Critical' ? 'error' :
                        threat.severity === 'High' ? 'warning' :
                        'info'
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={threat.title}
                    secondary={`${result.matchedLogs.length} events detected`}
                    sx={{ mb: isMobile ? 1 : 0 }}
                  />
                  <Chip 
                    label={threat.severity}
                    size="small"
                    color={
                      threat.severity === 'Critical' ? 'error' :
                      threat.severity === 'High' ? 'warning' :
                      'info'
                    }
                    sx={{ ml: isMobile ? 0 : 2 }}
                  />
                </ListItem>
              );
            })}
            {detectedAlerts.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No active alerts"
                  secondary="Your environment is currently secure"
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      {selectedThreat && (
        <AlertModal
          open={!!selectedThreat}
          onClose={() => setSelectedThreat(null)}
          threat={selectedThreat}
          matchedLogs={matchedLogs}
        />
      )}
    </>
  );
}