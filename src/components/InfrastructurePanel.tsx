import { useState } from 'react';
import { useSimulatorStore } from '../store/simulatorStore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MachineDetailDialog from './MachineDetailDialog';
import { SimulatedMachine } from '../types/Machine';

export default function InfrastructurePanel() {
  const { infrastructure } = useSimulatorStore();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all');
  const [selectedMachine, setSelectedMachine] = useState<SimulatedMachine | null>(null);

  if (!infrastructure) return null;

  const allMachines = infrastructure.flatMap(net => net.machines);
  const machines = selectedNetwork === 'all' 
    ? allMachines 
    : allMachines.filter(m => m.network === selectedNetwork);

  const networks = [...new Set(allMachines.map(m => m.network))];

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
            const machine = allMachines.find(m => m.hostname === params.row.hostname);
            setSelectedMachine(machine || null);
          }}
          color="primary"
        >
          <InfoIcon />
        </IconButton>
      ),
    },
    { field: 'hostname', headerName: 'Hostname', width: 200 },
    { field: 'ip', headerName: 'IP Address', width: 150 },
    { field: 'network', headerName: 'Network', width: 200 },
    { field: 'subnet', headerName: 'Subnet', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'location', headerName: 'Location', width: 250 },
    { field: 'owner', headerName: 'Owner', width: 200 },
  ];

  const rows = machines.map((machine, index) => ({
    id: index,
    hostname: machine.hostname,
    ip: machine.ip,
    network: machine.network,
    subnet: machine.subnet,
    type: machine.type,
    role: machine.role,
    location: machine.location ? `${machine.location.city}, ${machine.location.state_code}, ${machine.location.country_code}` : 'N/A',
    owner: machine.owner?.name || 'N/A'
  }));

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Network</InputLabel>
          <Select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value as string)}
            label="Network"
          >
            <MenuItem value="all">All Networks</MenuItem>
            {networks.map((network) => (
              <MenuItem key={network} value={network}>
                {network}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
      </Box>

      <MachineDetailDialog
        open={selectedMachine !== null}
        onClose={() => setSelectedMachine(null)}
        machine={selectedMachine}
      />
    </Box>
  );
}