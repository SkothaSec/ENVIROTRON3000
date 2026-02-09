import { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput, FormControlLabel, Switch, Stepper, Step, StepLabel, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Chip, useTheme, useMediaQuery, MobileStepper, Stack, SelectChangeEvent } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { countries } from '../data/geoData';
import { dataSourceDefinitions, typeColors } from '../data/dataSources';
import { generateUsers } from '../utils/generateUsers';
import { generateInfrastructure } from '../utils/generateInfrastructure';
import { generateAllLogs } from '../utils/generateLogs';
import { useSimulatorStore } from '../store/simulatorStore';
import { OrgConfig } from '../types/OrgConfig';

interface Props {
  onComplete?: () => void;
}

const steps = ['Organization Details', 'User Configuration', 'Data Sources', 'Review & Generate'];

export default function OrgForm({ onComplete }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { orgData, setOrgData, setUsers, setInfrastructure, setLogsBySource } = useSimulatorStore();
  const [activeStep, setActiveStep] = useState(0);
  
  const [formState, setFormState] = useState({
    orgName: '',
    selectedCountries: [] as string[],
    userCount: 25,
    remoteUsers: true,
    foreignUsers: true,
    selectedSources: Object.keys(dataSourceDefinitions),
  });

  useEffect(() => {
    if (orgData) {
      setFormState({
        orgName: orgData.orgName,
        selectedCountries: orgData.locations,
        userCount: orgData.userCount,
        remoteUsers: orgData.enableRemoteUsers,
        foreignUsers: orgData.enableForeignRemoteUsers,
        selectedSources: orgData.dataSources,
      });
    }
  }, [orgData]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const config: OrgConfig = {
        orgName: formState.orgName,
        locations: formState.selectedCountries,
        userCount: formState.userCount,
        enableRemoteUsers: formState.remoteUsers,
        enableForeignRemoteUsers: formState.foreignUsers,
        departments: [],
        dataSources: formState.selectedSources,
      };
      
      setOrgData(config);
      const users = generateUsers(config);
      setUsers(users);
      const infrastructure = generateInfrastructure(config, users);
      setInfrastructure(infrastructure);
      const logs = generateAllLogs(config, users, infrastructure);
      setLogsBySource(logs);
      
      if (onComplete) {
        onComplete();
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCountriesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      selectedCountries: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSourcesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      selectedSources: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formState.orgName.length > 0 && formState.selectedCountries.length > 0;
      case 1:
        return formState.userCount >= 1;
      case 2:
        return formState.selectedSources.length > 0;
      default:
        return true;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {isMobile ? (
        <MobileStepper
          variant="text"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
            >
              {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      ) : (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <Box sx={{ mt: 2, mb: 2 }}>
        {activeStep === 0 && (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Organization Name"
              value={formState.orgName}
              onChange={(e) => setFormState({ ...formState, orgName: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Countries</InputLabel>
              <Select
                multiple
                value={formState.selectedCountries}
                onChange={handleCountriesChange}
                input={<OutlinedInput label="Countries" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip 
                        key={value} 
                        label={countries.find(c => c.country_code === value)?.name || value} 
                      />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.country_code} value={country.country_code}>
                    <Checkbox checked={formState.selectedCountries.indexOf(country.country_code) > -1} />
                    <ListItemText primary={country.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        )}

        {activeStep === 1 && (
          <Stack spacing={3}>
            <TextField
              fullWidth
              type="number"
              label="Number of Users"
              value={formState.userCount}
              onChange={(e) => setFormState({ ...formState, userCount: parseInt(e.target.value) })}
              inputProps={{ min: 1, max: 1000 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formState.remoteUsers}
                  onChange={(e) => setFormState({ ...formState, remoteUsers: e.target.checked })}
                />
              }
              label="Enable Remote Users"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formState.foreignUsers}
                  onChange={(e) => setFormState({ ...formState, foreignUsers: e.target.checked })}
                  disabled={!formState.remoteUsers}
                />
              }
              label="Enable Foreign Remote Users"
            />
          </Stack>
        )}

        {activeStep === 2 && (
          <FormControl fullWidth>
            <InputLabel>Data Sources</InputLabel>
            <Select
              multiple
              value={formState.selectedSources}
              onChange={handleSourcesChange}
              input={<OutlinedInput label="Data Sources" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={dataSourceDefinitions[value].displayName}
                      sx={{
                        backgroundColor: typeColors[dataSourceDefinitions[value].type],
                        '& .MuiChip-label': { color: 'white' }
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {Object.entries(dataSourceDefinitions).map(([key, source]) => (
                <MenuItem key={key} value={key}>
                  <Checkbox checked={formState.selectedSources.indexOf(key) > -1} />
                  <ListItemText
                    primary={source.displayName}
                    secondary={source.description}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {activeStep === 3 && (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Organization Name</TableCell>
                  <TableCell>{formState.orgName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Locations</TableCell>
                  <TableCell>
                    {formState.selectedCountries.map(code => 
                      countries.find(c => c.country_code === code)?.name
                    ).join(', ')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Number of Users</TableCell>
                  <TableCell>{formState.userCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Remote Users</TableCell>
                  <TableCell>{formState.remoteUsers ? 'Enabled' : 'Disabled'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Foreign Remote Users</TableCell>
                  <TableCell>{formState.foreignUsers ? 'Enabled' : 'Disabled'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Data Sources</TableCell>
                  <TableCell>
                    {formState.selectedSources.map(source => 
                      dataSourceDefinitions[source].displayName
                    ).join(', ')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {!isMobile && (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            onClick={handleNext}
            disabled={!isStepValid(activeStep)}
          >
            {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
          </Button>
        </Box>
      )}
    </Box>
  );
}