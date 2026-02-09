import { Box, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants';
import { icon } from '../data/projectAssets';

const features = [
  {
    title: 'Security Event Simulation',
    description: 'Generate realistic security events and incidents across your infrastructure',
    icon: icon.find(i => i.title === 'Modeling')?.image
  },
  {
    title: 'Multi-Source Log Analytics',
    description: 'Collect and analyze logs from Windows, Linux, Cloud, and Security systems',
    icon: icon.find(i => i.title === 'Monitor')?.image
  },
  {
    title: 'Global Infrastructure',
    description: 'Monitor distributed infrastructure and users across multiple regions',
    icon: icon.find(i => i.title === 'Data Server')?.image
  },
  {
    title: 'Real-time Monitoring',
    description: 'Track security events and system health with interactive dashboards',
    icon: icon.find(i => i.title === 'Data')?.image
  },
  {
    title: 'Threat Detection',
    description: 'Identify and analyze potential security threats and vulnerabilities',
    icon: icon.find(i => i.title === 'Cyber Threat')?.image
  },
  {
    title: 'Access Management',
    description: 'Track user activity and access patterns across your environment',
    icon: icon.find(i => i.title === 'Easy Access')?.image
  }
];

export function Landing() {
  const navigate = useNavigate();
  const zenCircle = icon.find(i => i.title === 'Zen Circle')?.image;

  return (
    <Box className="cyber-grid">
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0,245,255,0.1) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h1" 
                className="glow-text"
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #00F5FF, #FF00E4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ENVIROTRON3000
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Advanced Security Environment Simulator
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  color: 'text.secondary', 
                  fontSize: '1.1rem',
                  maxWidth: '600px',
                  lineHeight: 1.6
                }}
              >
                Generate and monitor your own personal security environments with comprehensive logging, 
                threat detection, and real-time analytics. Perfect for security training, testing, and 
                infrastructure planning.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate(ROUTES.HOME)}
                className="gradient-border glow"
                sx={{ 
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,245,255,0.2), rgba(255,0,228,0.2))',
                    transition: 'all 0.3s ease-in-out'
                  },
                  '&:hover::before': {
                    opacity: 0
                  }
                }}
              >
                Launch Simulator
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, rgba(0,0,0,0) 70%)',
                    animation: 'pulse 2s infinite'
                  },
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'translate(-50%, -50%) scale(0.95)',
                      opacity: 0.5
                    },
                    '50%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      opacity: 0.8
                    },
                    '100%': {
                      transform: 'translate(-50%, -50%) scale(0.95)',
                      opacity: 0.5
                    }
                  }
                }}
              >
                <Box 
                  component="img"
                  src={zenCircle}
                  alt="Security Dashboard"
                  sx={{ 
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.3))'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          className="glow-text"
          sx={{ 
            mb: 6,
            background: 'linear-gradient(45deg, #00F5FF, #FF00E4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                className="gradient-border glow"
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    '& img': {
                      transform: 'scale(1.1)',
                    }
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    component="img"
                    src={feature.icon}
                    alt={feature.title}
                    sx={{ 
                      width: 80,
                      height: 80,
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                      filter: 'drop-shadow(0 0 10px rgba(0,245,255,0.3))'
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    className="glow-text"
                    sx={{
                      fontWeight: 600,
                      minHeight: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}