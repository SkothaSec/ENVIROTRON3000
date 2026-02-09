export const networkProfiles = {
  workstation: {
    name: 'Workstation Network',
    subnet: '10.0.0.0/24',
    description: 'Network for end-user workstations',
    type: 'workstation',
  },
  server: {
    name: 'Server Network',
    subnet: '10.1.0.0/24',
    description: 'Primary network for internal servers',
    type: 'infrastructure',
  },
  security: {
    name: 'Security Network',
    subnet: '10.2.0.0/24',
    description: 'Network for security infrastructure',
    type: 'infrastructure',
  },
  management: {
    name: 'Management Network',
    subnet: '10.3.0.0/24',
    description: 'Network for infrastructure management',
    type: 'infrastructure',
  },
  cloud: {
    name: 'Cloud Network',
    subnet: '10.4.0.0/24',
    description: 'Network for cloud infrastructure',
    type: 'infrastructure',
  },
  dmz: {
    name: 'DMZ Network',
    subnet: '10.5.0.0/24',
    description: 'Demilitarized zone for public-facing services',
    type: 'infrastructure',
  },
  mobile: {
    name: 'Mobile Device Network',
    subnet: '10.6.0.0/24',
    description: 'Network for mobile device management',
    type: 'infrastructure',
  },
  specialized: {
    name: 'Specialized Systems Network',
    subnet: '10.7.0.0/24',
    description: 'Network for specialized infrastructure',
    type: 'infrastructure',
  },
};

// Network type to machine type mapping
export const networkToMachineTypes: Record<string, string[]> = {
  workstation: ['workstation'],
  server: ['windows', 'linux', 'macos', 'server', 'database', 'email'],
  security: ['firewall', 'security', 'monitoring'],
  management: ['dns', 'monitoring'],
  cloud: ['cloud'],
  dmz: ['proxy', 'vpn'],
  mobile: ['android', 'ios'],
  specialized: ['server', 'database', 'monitoring'],
};