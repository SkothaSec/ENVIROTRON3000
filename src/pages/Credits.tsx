import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import {
  icon,
  packageAssets,
  people,
  defaultPackageIcon,
} from '../data/projectAssets';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`credits-tabpanel-${index}`}
      aria-labelledby={`credits-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function Credits() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [tabValue, setTabValue] = useState(0);

  const handleImageError = (id: string, fallbackSrc?: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
    const img = document.getElementById(id) as HTMLImageElement;
    if (fallbackSrc && img) {
      img.src = fallbackSrc;
    }
  };

  const renderImage = (
    src: string,
    alt: string,
    id: string,
    fallbackSrc?: string
  ) => {
    const isUrl = src.startsWith('http://') || src.startsWith('https://');
    return (
      <img
        id={id}
        src={imgErrors[id] && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        style={{
          width: 32,
          height: 32,
          objectFit: 'contain',
        }}
        onError={() => handleImageError(id, fallbackSrc)}
        {...(isUrl ? { crossOrigin: 'anonymous' } : {})}
      />
    );
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredIcons = icon.filter(icon => icon.include_attribution);
  const filteredPackages = packageAssets.filter(pkg => pkg.include_attribution);
  const filteredPeople = people.filter(person => person.include_attribution);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom className="glow-text">
        Credits & Attributions
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Icons" />
          <Tab label="Packages" />
          <Tab label="Contributors" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {filteredIcons.map((credit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="gradient-border">
                <CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                  >
                    {renderImage(credit.image, credit.title, `icon-${index}`)}
                    <Typography variant="h6">{credit.title}</Typography>
                  </Box>
                  <Box sx={{ color: 'text.secondary' }}>
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'inherit',
                              textDecoration: 'underline',
                            }}
                          />
                        ),
                      }}
                    >
                      {credit.attribution}
                    </ReactMarkdown>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {filteredPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="gradient-border">
                <CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                  >
                    {renderImage(
                      pkg.image || defaultPackageIcon,
                      pkg.title,
                      `pkg-${index}`,
                      defaultPackageIcon
                    )}
                    <Typography variant="h6">{pkg.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {pkg.description}
                  </Typography>
                  <Box sx={{ color: 'text.secondary' }}>
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'inherit',
                              textDecoration: 'underline',
                            }}
                          />
                        ),
                      }}
                    >
                      {pkg.attribution}
                    </ReactMarkdown>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {filteredPeople.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="gradient-border">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {person.notes}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {person.socials.map((social, socialIndex) => {
                      const Icon = social.icon;
                      return (
                        <IconButton
                          key={socialIndex}
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          color="primary"
                          aria-label={social.label}
                        >
                          <Icon />
                        </IconButton>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
}