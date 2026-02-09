import { Box } from '@mui/material';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box 
      className="cyber-grid" 
      sx={{ 
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #141B2D 0%, #0A0E17 100%)',
      }}
    >
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}