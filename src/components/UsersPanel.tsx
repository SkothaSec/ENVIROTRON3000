import { useState } from 'react';
import { useSimulatorStore } from '../store/simulatorStore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import UserDetailDialog from './UserDetailDialog';
import { SimulatedUser } from '../types/User';

export default function UsersPanel() {
  const { users, infrastructure } = useSimulatorStore();
  const [selectedUser, setSelectedUser] = useState<SimulatedUser | null>(null);

  if (!users) return null;

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => {
            const user = users.find(u => u.id === params.row.id);
            setSelectedUser(user || null);
          }}
          color="primary"
        >
          <InfoIcon />
        </IconButton>
      ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'location', headerName: 'Location', width: 250 },
    { field: 'is_remote', headerName: 'Remote', width: 100, type: 'boolean' },
  ];

  const rows = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    department: user.department,
    role: user.role,
    location: user.location ? `${user.location.city}, ${user.location.state_code}, ${user.location.country_code}` : 'N/A',
    is_remote: user.is_remote
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        filterMode="server"
        slots={{
          toolbar: () => null,
        }}
      />
      <UserDetailDialog
        open={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
        infrastructure={infrastructure || []}
      />
    </Box>
  );
}