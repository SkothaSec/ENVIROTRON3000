import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import { SimulatedUser } from '../types/User';
import { Network } from '../types/Network';

interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: SimulatedUser | null;
  infrastructure: Network[];
}

export default function UserDetailDialog({
  open,
  onClose,
  user,
  infrastructure,
}: UserDetailDialogProps) {
  // Find machines where the user's ID matches the owner's ID
  const userMachines = user ? infrastructure
    .flatMap(network => network.machines)
    .filter(machine => machine.owner?.id === user.id) : [];

  const detailData = user ? {
    ...user,
    assigned_machines: userMachines
  } : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {detailData ? (
          <Box sx={{ '& > *': { mb: 1 } }}>
            <pre style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '500px'
            }}>
              <code>
                {JSON.stringify(detailData, null, 2)}
              </code>
            </pre>
          </Box>
        ) : (
          'No user selected'
        )}
      </DialogContent>
    </Dialog>
  );
}