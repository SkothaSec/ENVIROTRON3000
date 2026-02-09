import { Box, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Tooltip, Typography, Chip, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LogSource, LogSeverity, LogSourceDisplayNames } from '../../../types/LogEvent';
import { dataSourceDefinitions } from '../../../data/dataSources';

interface FilterPanelProps {
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
  severityFilter: LogSeverity[];
  onSeverityChange: (severity: LogSeverity[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onReset: () => void;
  dataSources: string[];
}

export default function FilterPanel({
  selectedSources,
  onSourcesChange,
  severityFilter,
  onSeverityChange,
  searchTerm,
  onSearchChange,
  onReset,
  dataSources
}: FilterPanelProps) {
  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <InputLabel>Data Sources</InputLabel>
        <Select
          multiple
          value={selectedSources}
          onChange={(e) => onSourcesChange(e.target.value as string[])}
          label="Data Sources"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                  key={value} 
                  label={LogSourceDisplayNames[value as LogSource]} 
                  size="small"
                />
              ))}
            </Box>
          )}
        >
          {dataSources.map((source) => (
            <MenuItem key={source} value={source}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {dataSourceDefinitions[source as LogSource]?.icon && (
                  <img 
                    src={dataSourceDefinitions[source as LogSource].icon} 
                    alt="" 
                    style={{ width: 20, height: 20 }}
                  />
                )}
                <Typography>
                  {LogSourceDisplayNames[source as LogSource]}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Severity</InputLabel>
        <Select
          multiple
          value={severityFilter}
          onChange={(e) => onSeverityChange(e.target.value as LogSeverity[])}
          label="Severity"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                  key={value} 
                  label={value} 
                  size="small"
                  color={value === 'Critical' ? 'error' : value === 'Warning' ? 'warning' : 'info'}
                />
              ))}
            </Box>
          )}
        >
          {['Critical', 'Warning', 'Info'].map((severity) => (
            <MenuItem key={severity} value={severity}>
              {severity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          fullWidth
          label="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by user, host, or IP..."
        />
        <Tooltip title="Reset Filters">
          <IconButton onClick={onReset} sx={{ mt: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
}