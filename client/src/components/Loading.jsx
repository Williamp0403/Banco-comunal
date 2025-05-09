import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loading({ className }) {
  return (
    <Box className={className}>
      <CircularProgress size={50}/>
    </Box>
  )
}