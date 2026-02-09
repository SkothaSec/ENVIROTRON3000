import { faker } from '@faker-js/faker';
import { SimulatedUser } from '../../types/User';

export function generateWindowsLogs(
  users: SimulatedUser[],
  count: number
) {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      user: user.name,
      source_ip: faker.internet.ip(),
      host: faker.internet.domainName(),
      source: 'Windows Logs',
      event_id: faker.number.int({ min: 1000, max: 1100 }),
      severity: faker.helpers.arrayElement(['Info', 'Warning', 'Error']),
      activity: faker.helpers.arrayElement([
        'Logon Success',
        'Logon Failure',
        'File Accessed',
        'Process Started',
      ]),
    };
  });
}

export function generateFirewallLogs(
  users: SimulatedUser[],
  count: number
) {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      user: user.name,
      source: 'Firewall Logs',
      source_ip: faker.internet.ip(),
      dest_ip: faker.internet.ip(),
      action: faker.helpers.arrayElement(['ALLOW', 'DENY']),
      protocol: faker.helpers.arrayElement(['TCP', 'UDP']),
      port: faker.number.int({ min: 20, max: 8080 }),
      severity: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    };
  });
}

export function generateDnsLogs(count: number) {
  return Array.from({ length: count }, () => {
    return {
      timestamp: faker.date.recent().toISOString(),
      source: 'DNS Logs',
      host: faker.internet.domainName(),
      ip: faker.internet.ip(),
      query: faker.internet.domainName(),
      type: faker.helpers.arrayElement(['A', 'AAAA', 'MX', 'CNAME']),
      response_code: faker.helpers.arrayElement(['NOERROR', 'NXDOMAIN']),
    };
  });
}

export function generateVpnLogs(users: SimulatedUser[], count: number) {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      user: user.name,
      source: 'VPN Logs',
      source_ip: faker.internet.ip(),
      vpn_server: faker.internet.ip(),
      connection_status: faker.helpers.arrayElement(['Success', 'Failure']),
      reason: faker.helpers.arrayElement([
        'Timeout',
        'Credential Error',
        'Disconnected',
        'Success',
      ]),
      duration_minutes: faker.number.int({ min: 1, max: 180 }),
    };
  });
}

export function generateProxyLogs(users: SimulatedUser[], count: number) {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      source: 'Proxy Logs',
      user: user.name,
      source_ip: faker.internet.ip(),
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(['GET', 'POST', 'PUT']),
      status_code: faker.helpers.arrayElement([200, 403, 404, 500]),
      user_agent: faker.internet.userAgent(),
    };
  });
}

export function generateEmailLogs(users: SimulatedUser[], count: number) {
  return Array.from({ length: count }, () => {
    const sender = faker.helpers.arrayElement(users);
    const recipient = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      source: 'Email Logs',
      sender: sender.email,
      recipient: recipient.email,
      subject: faker.lorem.words(3),
      status: faker.helpers.arrayElement([
        'Delivered',
        'Blocked',
        'Spam Quarantined',
      ]),
      attachment: faker.datatype.boolean(),
    };
  });
}

export function generateCloudLogs(users: SimulatedUser[], count: number) {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      timestamp: faker.date.recent().toISOString(),
      source: 'Cloud Audit Logs',
      user: user.name,
      action: faker.helpers.arrayElement([
        'Create VM',
        'Delete Bucket',
        'Update Policy',
        'Access Secret',
      ]),
      service: faker.helpers.arrayElement([
        'Compute',
        'Storage',
        'IAM',
        'SecretsManager',
      ]),
      result: faker.helpers.arrayElement(['Success', 'Failure']),
      ip_address: faker.internet.ip(),
    };
  });
}