import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BuildIcon from '@mui/icons-material/Build';
import PreviewIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorMode } from '../../context/ThemeContext';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Builder', path: '/builder', icon: <BuildIcon /> },
  { label: 'Preview', path: '/preview', icon: <PreviewIcon /> },
  { label: 'ATS Scorer', path: '/ats-scorer', icon: <AssessmentIcon /> },
];

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(8,16,28,0.85) 0%, rgba(18,34,56,0.8) 50%, rgba(29,48,74,0.85) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(240,244,250,0.8) 50%, rgba(255,255,255,0.85) 100%)',
          backdropFilter: 'blur(14px)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
          boxShadow: isDark ? '0 10px 24px rgba(0,0,0,0.35)' : '0 10px 24px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {/* Brand */}
          <Box
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: isMobile ? 1 : 0, mr: 4 }}
          >
            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, letterSpacing: 0.5 }}>
              ResumeGenie
            </Typography>
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
              {navItems.map(item => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.secondary,
                    borderBottom: isActive(item.path) ? '2px solid ' + theme.palette.primary.main : '2px solid transparent',
                    borderRadius: 0,
                    px: 2,
                    py: 1,
                    '&:hover': { color: theme.palette.text.primary, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Action buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{ color: theme.palette.text.primary }}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ color: theme.palette.text.primary }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 2, background: theme.palette.background.paper, height: '100%' }}>
          <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon color="primary" />
            <Typography variant="h6" color="primary" fontWeight={700}>ResumeGenie</Typography>
          </Box>
          <List>
            {navItems.map(item => (
              <ListItemButton
                key={item.path}
                selected={isActive(item.path)}
                onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                sx={{ mx: 1, borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
