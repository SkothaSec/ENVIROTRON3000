import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography, 
  Stack, 
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogEvent } from '../../types/LogEvent';

interface LogDetailDialogProps {
  open: boolean;
  onClose: () => void;
  log: LogEvent | null;
}

export default function LogDetailDialog({
  open,
  onClose,
  log,
}: LogDetailDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'object') {
      return (
        <pre style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '0.5rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
          <code>
            {JSON.stringify(value, null, 2)}
          </code>
        </pre>
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return String(value);
  };

  const renderLogFields = (log: LogEvent) => {
    // Get all fields from the log object
    const fields = Object.entries(log).filter(([key]) => key !== '__typename');

    // Group fields by category
    const baseFields = ['id', 'timestamp', 'user', 'sourceIP', 'host', 'severity', 'dataSource'];
    const networkFields = ['protocol', 'port', 'destIP', 'direction', 'clientIP'];
    const securityFields = ['action', 'eventID', 'result', 'reason', 'rule', 'attackType'];
    const webFields = ['method', 'requestURL', 'userAgent', 'service'];

    const categorizedFields = {
      'Basic Information': baseFields,
      'Network Details': networkFields,
      'Security Information': securityFields,
      'Web Details': webFields,
      'Additional Details': fields
        .filter(([key]) => 
          ![...baseFields, ...networkFields, ...securityFields, ...webFields].includes(key)
        )
        .map(([key]) => key)
    };

    return (
      <Stack spacing={3}>
        {Object.entries(categorizedFields).map(([category, fieldList]) => {
          const relevantFields = fields.filter(([key]) => fieldList.includes(key));
          if (relevantFields.length === 0) return null;

          return (
            <Box key={category}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {category}
              </Typography>
              <Stack spacing={2}>
                {relevantFields.map(([key, value]) => (
                  <Box key={key}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    {key === 'severity' ? (
                      <Chip 
                        label={value}
                        color={
                          value === 'Critical' ? 'error' :
                          value === 'Warning' ? 'warning' : 'info'
                        }
                        size="small"
                      />
                    ) : (
                      renderValue(value)
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Log Details</Typography>
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
        {log ? renderLogFields(log) : 'No log selected'}
      </DialogContent>
    </Dialog>
  );
}