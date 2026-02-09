export interface DataSourceDefinition {
  displayName: string;
  estimatedAssets: number;
  type: 'workstation' | 'server' | 'firewall' | 'proxy' | 'cloud' | 'email' | 'security' | 'database' | 'monitoring' | 'mobile';
  os: 'Windows' | 'Linux' | 'macOS' | 'Android' | 'iOS' | 'Cloud';
  description: string;
  icon?: string;
}

export const dataSourceDefinitions: Record<string, DataSourceDefinition> = {
  windows: {
    displayName: 'Windows Event Logs',
    estimatedAssets: 1,
    type: 'workstation',
    os: 'Windows',
    description: 'System, security, and application events from Windows machines',
    icon: '/icons/monitor.png'
  },
  linux: {
    displayName: 'Linux System Logs',
    estimatedAssets: 1,
    type: 'workstation',
    os: 'Linux',
    description: 'System logs, audit logs, and application events from Linux systems',
    icon: '/icons/server.png'
  },
  macos: {
    displayName: 'macOS System Logs',
    estimatedAssets: 1,
    type: 'workstation',
    os: 'macOS',
    description: 'System and application events from macOS devices',
    icon: '/icons/monitor.png'
  },
  android: {
    displayName: 'Android Device Logs',
    estimatedAssets: 1,
    type: 'mobile',
    os: 'Android',
    description: 'Mobile device logs, app events, and security alerts from Android devices',
    icon: '/icons/data.png'
  },
  ios: {
    displayName: 'iOS Device Logs',
    estimatedAssets: 1,
    type: 'mobile',
    os: 'iOS',
    description: 'Mobile device logs, app events, and security alerts from iOS devices',
    icon: '/icons/data.png'
  },
  firewall: {
    displayName: 'Firewall Logs',
    estimatedAssets: 2,
    type: 'firewall',
    os: 'Linux',
    description: 'Network traffic and security events from firewalls',
    icon: '/icons/browser.png'
  },
  vpn: {
    displayName: 'VPN Access Logs',
    estimatedAssets: 1,
    type: 'security',
    os: 'Linux',
    description: 'Remote access and VPN connection events',
    icon: '/icons/vpn.png'
  },
  dns: {
    displayName: 'DNS Logs',
    estimatedAssets: 1,
    type: 'server',
    os: 'Linux',
    description: 'Domain name resolution and DNS query logs',
    icon: '/icons/browser.png'
  },
  proxy: {
    displayName: 'Web Proxy Logs',
    estimatedAssets: 1,
    type: 'proxy',
    os: 'Linux',
    description: 'Web traffic and content filtering events',
    icon: '/icons/proxy.png'
  },
  email: {
    displayName: 'Email Server Logs',
    estimatedAssets: 1,
    type: 'email',
    os: 'Linux',
    description: 'Email delivery, spam, and security events',
    icon: '/icons/mail.png'
  },
  cloud: {
    displayName: 'Cloud Audit Logs',
    estimatedAssets: 1,
    type: 'cloud',
    os: 'Cloud',
    description: 'Cloud infrastructure and service audit events',
    icon: '/icons/server-1.png'
  },
  ids: {
    displayName: 'IDS/IPS Logs',
    estimatedAssets: 2,
    type: 'security',
    os: 'Linux',
    description: 'Intrusion detection and prevention events',
    icon: '/icons/target.png'
  },
  waf: {
    displayName: 'Web Application Firewall',
    estimatedAssets: 1,
    type: 'security',
    os: 'Linux',
    description: 'Web application security and attack events',
    icon: '/icons/dangerous.png'
  },
  database: {
    displayName: 'Database Audit Logs',
    estimatedAssets: 2,
    type: 'database',
    os: 'Linux',
    description: 'Database access and modification events',
    icon: '/icons/database-storage.png'
  },
  authentication: {
    displayName: 'Authentication Logs',
    estimatedAssets: 1,
    type: 'security',
    os: 'Linux',
    description: 'User authentication and access control events',
    icon: '/icons/two-factor-authentication.png'
  },
  monitoring: {
    displayName: 'System Monitoring',
    estimatedAssets: 1,
    type: 'monitoring',
    os: 'Linux',
    description: 'System health and performance metrics',
    icon: '/icons/monitor.png'
  }
};

export const osColors = {
  Windows: '#00A4EF',
  Linux: '#FCC624',
  macOS: '#999999',
  Android: '#3DDC84',
  iOS: '#000000',
  Cloud: '#0089D6'
};

export const typeColors = {
  workstation: '#4CAF50',
  server: '#2196F3',
  firewall: '#F44336',
  proxy: '#9C27B0',
  cloud: '#00BCD4',
  email: '#FF9800',
  security: '#E91E63',
  database: '#673AB7',
  monitoring: '#009688',
  mobile: '#FF5722'
};