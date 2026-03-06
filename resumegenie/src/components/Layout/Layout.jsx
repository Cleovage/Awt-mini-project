import { Box } from '@mui/material';
import Navbar from './Navbar';
import AbstractBackground from './AbstractBackground';

export default function Layout({ children }) {
  return (
    <>
      <AbstractBackground />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, pt: '70px', pb: 4 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
