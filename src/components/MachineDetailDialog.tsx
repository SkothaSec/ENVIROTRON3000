import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import { SimulatedMachine } from '../types/Machine';

interface MachineDetailDialogProps {
  open: boolean;
  onClose: () => void;
  machine: SimulatedMachine | null;
}

export default function MachineDetailDialog({
  open,
  onClose,
  machine,
}: MachineDetailDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Machine Details</DialogTitle>
      <DialogContent>
        {machine ? (
          <Box sx={{ '& > *': { mb: 1 } }}>
            <pre style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '500px'
            }}>
              <code>
                {JSON.stringify(machine, null, 2)}
              </code>
            </pre>
          </Box>
        ) : (
          'No machine selected'
        )}
      </DialogContent>
    </Dialog>
  );
}