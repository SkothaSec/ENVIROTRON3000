import { useState } from 'react';
import { useSimulatorStore } from '../../store/simulatorStore';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  IconButton, 
  Typography,
  Card,
  SelectChangeEvent
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import LogDetailDialog from './LogDetailDialog';
import { LogEvent, LogSeverity, LogSourceDisplayNames, LogSource } from '../../types/LogEvent';
import { dataSourceDefinitions } from '../../data/dataSources';

interface LogsPanelProps {
  logs?: LogEvent[];
}

export default function LogsPanel({ logs: providedLogs }: LogsPanelProps) {
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<LogEvent | null>(null);
  const { logsBySource, orgData } = useSimulatorStore();

  if (!logsBySource || !orgData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No environment data available
        </Typography>
      </Box>
    );
  }

  const enabledSources = orgData.dataSources;
  const availableLogs = providedLogs || Object.entries(logsBySource)
    .filter(([source]) => enabledSources.includes(source))
    .reduce((acc, [source, logs]) => {
      acc[source] = logs;
      return acc;
    }, {} as Record<string, LogEvent[]>);

  const sources = Object.keys(availableLogs);
  const logs = Array.isArray(availableLogs) ? availableLogs : (
    selectedSource === 'all'
      ? Object.values(availableLogs).flat()
      : availableLogs[selectedSource] || []
  );

  const getSeverityColor = (severity: LogSeverity) => {
    switch (severity) {
      case 'Critical': return 'error';
      case 'Warning': return 'warning';
      case 'Info': return 'info';
    }
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    setSelectedSource(event.target.value);
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="small"
          onClick={() => setSelectedLog(params.row as LogEvent)}
          color="primary"
        >
          <InfoIcon />
        </IconButton>
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 180,
      valueFormatter: (params) => {
        const date = new Date(params.value as string);
        return date.toLocaleString();
      },
    },
    {
      field: 'severity',
      headerName: 'Severity',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={getSeverityColor(params.value as LogSeverity)}
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

  const rows = logs.map((log) => {
    const { id = crypto.randomUUID(), ...rest } = log;
    return { id, ...rest };
  });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Data Source</InputLabel>
          <Select
            value={selectedSource}
            onChange={handleSourceChange}
            label="Data Source"
          >
            <MenuItem value="all">All Sources</MenuItem>
            {sources.map((source) => (
              <MenuItem key={source} value={source}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {dataSourceDefinitions[source as LogSource]?.icon && (
                    <img 
                      src={dataSourceDefinitions[source as LogSource].icon} 
                      alt="" 
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                  {LogSourceDisplayNames[source as LogSource]}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Card className="gradient-border">
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            density="compact"
          />
        </Box>
      </Card>

      <LogDetailDialog
        open={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />
    </Box>
  );
}