import { Box } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

export function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}