import { faker } from '@faker-js/faker';
import { LogEvent, LogSeverity, LogSource } from '../types/LogEvent';
import { SimulatedUser } from '../types/User';
import { Network } from '../types/Network';
import { OrgConfig } from '../types/OrgConfig';

// Generate a timestamp within the last 24 hours
function generateRecentTimestamp(): string {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return faker.date.between({ from: twentyFourHoursAgo, to: now }).toISOString();
}

// Generate some malicious patterns occasionally
function generateMaliciousPattern(type: string): string | null {
  if (Math.random() > 0.1) return null; // 10% chance of malicious pattern

  switch (type) {
    case 'commandLine':
      return faker.helpers.arrayElement([
        'powershell.exe -NoProfile -ExecutionPolicy Bypass -enc',
        'cmd.exe /c whoami',
        'bash -c curl',
      ]);
    case 'sql':
      return faker.helpers.arrayElement([
        "DROP TABLE users",
        "DELETE FROM accounts",
        "TRUNCATE TABLE logs",
      ]);
    case 'web':
      return faker.helpers.arrayElement([
        "' OR '1'='1",
        "<script>alert('xss')</script>",
        "../../../etc/passwd",
      ]);
    default:
      return null;
  }
}

// Function to generate all logs
export function generateAllLogs(
  config: OrgConfig,
  users: SimulatedUser[],
  infrastructure: Network[]
): Record<LogSource, LogEvent[]> {
  const logs: Partial<Record<LogSource, LogEvent[]>> = {};

  config.dataSources.forEach((source) => {
    const sourceLogs: LogEvent[] = [];
    const sourceMachines = infrastructure
      .flatMap(net => net.machines)
      .filter(m => m.role === source);

    for (let hour = 0; hour < 24; hour++) {
      const logsThisHour = Math.floor(Math.random() * 10) + 5;

      for (let i = 0; i < logsThisHour; i++) {
        const timestamp = generateRecentTimestamp();
        const user = faker.helpers.arrayElement(users);
        const machine = sourceMachines.length > 0 ? 
          faker.helpers.arrayElement(sourceMachines) : 
          faker.helpers.arrayElement(infrastructure.flatMap(net => net.machines));

        const baseLog: Partial<LogEvent> = {
          id: crypto.randomUUID(),
          timestamp,
          user: user.name,
          sourceIP: machine.ip,
          host: machine.hostname,
          dataSource: source as LogSource,
          severity: faker.helpers.arrayElement(['Info', 'Warning', 'Critical']) as LogSeverity,
          action: 'unknown',
          result: faker.helpers.arrayElement(['success', 'fail']),
          location: machine.location
        };

        let log: LogEvent;
        switch (source) {
          case 'windows':
          case 'linux':
          case 'macos': {
            const maliciousCmd = generateMaliciousPattern('commandLine');
            log = {
              ...baseLog,
              eventID: faker.number.int({ min: 1000, max: 9999 }),
              action: faker.helpers.arrayElement(['logon', 'logoff', 'fileAccess', 'processStart', 'systemChange']),
              result: faker.helpers.arrayElement(['success', 'fail']),
              details: {
                processName: faker.system.fileName(),
                filePath: faker.system.filePath(),
                userContext: maliciousCmd ? 'root' : baseLog.user,
                commandLine: maliciousCmd || faker.system.fileName()
              }
            } as LogEvent;
            break;
          }
          case 'database': {
            const maliciousQuery = generateMaliciousPattern('sql');
            log = {
              ...baseLog,
              action: 'query',
              operation: maliciousQuery ? 'drop' : faker.helpers.arrayElement(['select', 'insert', 'update']),
              database: faker.helpers.arrayElement(['users', 'products', 'orders', 'analytics']),
              table: faker.helpers.arrayElement(['users', 'accounts', 'transactions', 'logs']),
              query: maliciousQuery || 'SELECT * FROM users WHERE id = 1',
              result: 'success'
            } as LogEvent;
            break;
          }
          case 'waf': {
            const maliciousPattern = generateMaliciousPattern('web');
            log = {
              ...baseLog,
              action: maliciousPattern ? 'block' : 'allow',
              requestURL: maliciousPattern ? '/api/users' + maliciousPattern : faker.internet.url(),
              attackType: maliciousPattern ? 'SQL Injection' : faker.helpers.arrayElement(['Normal Request', 'Invalid Format']),
              ruleID: `WAF-${faker.string.alphanumeric(6)}`,
              clientIP: faker.internet.ip(),
              userAgent: faker.internet.userAgent(),
              country: faker.location.countryCode(),
              result: maliciousPattern ? 'fail' : 'success'
            } as LogEvent;
            break;
          }
          default:
            log = baseLog as LogEvent;
        }

        sourceLogs.push(log);
      }
    }

    logs[source as LogSource] = sourceLogs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

  return logs as Record<LogSource, LogEvent[]>;
}