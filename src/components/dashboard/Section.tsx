import { Grid } from '@mui/material';
import { ReactNode } from 'react';
export default function Section({ children }: { children: ReactNode }) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {children}
    </Grid>
  );
}
