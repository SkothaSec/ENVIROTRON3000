import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Box, 
  Typography, 
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ExampleQuery } from '../../../types/Query';

interface ExampleQueriesDialogProps {
  open: boolean;
  onClose: () => void;
  examples: ExampleQuery[];
  onSelectQuery: (query: string) => void;
}

export default function ExampleQueriesDialog({ 
  open, 
  onClose, 
  examples, 
  onSelectQuery 
}: ExampleQueriesDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Typography variant="h6">Example Security Queries</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {examples.map((example, index) => (
            <ListItem 
              key={index}
              disablePadding
              sx={{ 
                borderBottom: index < examples.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <ListItemButton onClick={() => onSelectQuery(example.query)}>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle1">
                        {example.title}
                      </Typography>
                      <Chip 
                        label={example.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Stack>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {example.description}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'monospace',
                          bgcolor: 'rgba(0,0,0,0.2)',
                          p: 1,
                          borderRadius: 1,
                          overflowX: 'auto'
                        }}
                      >
                        {example.query}
                      </Typography>
                    </Box>
                  }
                  sx={{ py: 1 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}