import { faker } from '@faker-js/faker';
import { LogEvent, LogSeverity, LogSource } from '../types/LogEvent';
import { generateRandomIP } from '../utils/generateIp';

// Generate a timestamp within the last 24 hours
function generateRecentTimestamp(): string {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return faker.date.between({ from: twentyFourHoursAgo, to: now }).toISOString();
}

export const securityLogs: LogEvent[] = [
  // Authentication Log
  {
    id: faker.string.uuid(),
    timestamp: generateRecentTimestamp(),
    user: 'admin',
    sourceIP: '192.168.1.100',
    host: 'auth-server-01',
    dataSource: 'authentication',
    severity: 'Critical',
    action: 'login',
    result: 'fail',
    method: 'password',
    service: 'SSO Portal',
    reason: 'Invalid password attempt',
    location: {
      city: 'New York',
      state_code: 'NY',
      country_code: 'US',
      timezone: 'America/New_York',
      coordinates: {
        lat: 40.7128,
        long: -74.0060
      }
    }
  } as LogEvent,

  // Database Log
  {
    id: faker.string.uuid(),
    timestamp: generateRecentTimestamp(),
    user: 'webapp_user',
    sourceIP: '203.0.113.45',
    host: 'db-primary-01',
    dataSource: 'database',
    severity: 'Critical',
    action: 'query',
    operation: 'select',
    database: 'users',
    table: 'accounts',
    query: "SELECT * FROM users WHERE id = '1' OR '1'='1'",
    result: 'fail'
  } as LogEvent,

  // Proxy Log
  {
    id: faker.string.uuid(),
    timestamp: generateRecentTimestamp(),
    user: 'john.doe',
    sourceIP: '192.168.2.50',
    host: 'proxy-01',
    dataSource: 'proxy',
    severity: 'Critical',
    action: 'block',
    url: 'https://suspicious-file-share.com/upload',
    method: 'POST',
    statusCode: 403,
    category: 'File Sharing',
    blocked: true,
    bytes: 15000000,
    result: 'fail'
  } as LogEvent,

  // VPN Log
  {
    id: faker.string.uuid(),
    timestamp: generateRecentTimestamp(),
    user: 'remote.user',
    sourceIP: '203.0.113.200',
    host: 'vpn-server-01',
    dataSource: 'vpn',
    severity: 'Warning',
    action: 'connect',
    sessionID: faker.string.uuid(),
    connectionType: 'connect',
    authMethod: 'certificate',
    result: 'fail',
    reason: 'Certificate expired'
  } as LogEvent
];

// Function to generate additional security logs
export function generateSecurityLogs(count: number): LogEvent[] {
  const logs: LogEvent[] = [];

  for (let i = 0; i < count; i++) {
    const log: LogEvent = {
      id: faker.string.uuid(),
      timestamp: generateRecentTimestamp(),
      user: faker.internet.userName(),
      sourceIP: generateRandomIP(),
      host: `${faker.helpers.arrayElement(['srv', 'web', 'db', 'app'])}-${faker.number.int({ min: 1, max: 99 })}`,
      dataSource: faker.helpers.arrayElement(['authentication', 'database', 'proxy', 'vpn']) as LogSource,
      severity: faker.helpers.arrayElement(['Info', 'Warning', 'Critical']) as LogSeverity,
      action: faker.helpers.arrayElement(['login', 'query', 'block', 'connect']),
      result: faker.helpers.arrayElement(['success', 'fail'])
    } as LogEvent;

    logs.push(log);
  }

  return logs;
}