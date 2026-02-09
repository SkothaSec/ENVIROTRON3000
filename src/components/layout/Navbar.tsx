import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useScrollTrigger, 
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  ListItemIcon,
  alpha
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

const navItems = [
  { path: ROUTES.HOME, label: 'Simulator', icon: HomeIcon },
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
  { path: ROUTES.CREDITS, label: 'Credits', icon: InfoIcon }
];

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: trigger 
          ? 'rgba(10, 14, 23, 0.9)'
          : 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 245, 255, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: trigger ? 64 : 80,
            transition: 'height 0.3s ease-in-out'
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              component={RouterLink}
              to={ROUTES.LANDING}
              className="glow-text"
              sx={{ 
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                textTransform: 'none',
                fontWeight: 700,
                color: 'primary.main',
                letterSpacing: '0.1em',
                '&:hover': {
                  backgroundColor: 'rgba(0, 245, 255, 0.1)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '1rem',
                  right: '1rem',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                },
                '&:hover::before': {
                  opacity: 1
                }
              }}
            >
              ENVIROTRON3000
            </Button>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    backgroundImage: 'linear-gradient(45deg, rgba(0,245,255,0.05), rgba(255,0,228,0.05))',
                    '& .MuiMenuItem-root': {
                      px: 2.5,
                      py: 1.5,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: alpha(theme.palette.background.paper, 0.9),
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                {navItems.map(({ path, label, icon: Icon }) => (
                  <MenuItem
                    key={path}
                    onClick={() => {
                      handleMenuClose();
                      window.location.href = path;
                    }}
                    selected={isActive(path)}
                    sx={{
                      borderRadius: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 245, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 245, 255, 0.2)',
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive(path) ? 'primary.main' : 'inherit' }}>
                      <Icon />
                    </ListItemIcon>
                    <Typography>{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 1,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-1px',
                  left: '-1px',
                  right: '-1px',
                  bottom: '-1px',
                  background: 'linear-gradient(45deg, rgba(0,245,255,0.1), rgba(255,0,228,0.1))',
                  borderRadius: '8px',
                  opacity: 0.5,
                  zIndex: -1
                }
              }}
            >
              {navItems.map(({ path, label }) => (
                <Button 
                  key={path}
                  component={RouterLink} 
                  to={path}
                  className={isActive(path) ? 'glow-text' : ''}
                  sx={{
                    color: 'white',
                    px: 3,
                    py: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isActive(path) 
                        ? 'linear-gradient(45deg, rgba(0,245,255,0.15), rgba(255,0,228,0.15))'
                        : 'transparent',
                      transition: 'all 0.3s ease-in-out'
                    },
                    '&:hover::before': {
                      background: 'linear-gradient(45deg, rgba(0,245,255,0.2), rgba(255,0,228,0.2))'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: isActive(path) ? '10%' : '50%',
                      right: isActive(path) ? '10%' : '50%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)',
                      transition: 'all 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      left: '10%',
                      right: '10%'
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}