import { faker } from '@faker-js/faker';
import { 
  ThreatIntelligence, 
  mapThreatToLogSeverity 
} from '../types/ThreatIntelligence';
import { LogEvent, LogSource } from '../types/LogEvent';

interface LogRule {
  type: "pattern" | "static" | "dynamic";
  value: string | RegExp | string[] | number | boolean;
  generator?: (context: any) => any;
}

interface LogTemplate {
  baseFields: Record<string, LogRule>;
  variations?: Record<string, LogRule>[];
}

function evaluateLogRule(rule: LogRule, context: any = {}): any {
  switch (rule.type) {
    case 'static':
      return rule.value;
    
    case 'pattern':
      if (rule.value instanceof RegExp) {
        return faker.string.alphanumeric({ length: 10 });
      }
      return faker.string.alphanumeric({ length: 10 });
    
    case 'dynamic':
      if (rule.generator) {
        return rule.generator(context);
      }
      if (Array.isArray(rule.value)) {
        return faker.helpers.arrayElement(rule.value);
      }
      return rule.value;
    
    default:
      return null;
  }
}

function generateLogFromTemplate(
  template: LogTemplate,
  threat: ThreatIntelligence,
  dataSource: LogSource,
  context: any = {}
): LogEvent {
  const baseLog: Partial<LogEvent> = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    severity: mapThreatToLogSeverity(threat.severity),
    dataSource,
    action: 'unknown',
    result: 'fail'
  };

  Object.entries(template.baseFields).forEach(([field, rule]) => {
    (baseLog as any)[field] = evaluateLogRule(rule, context);
  });

  if (template.variations && template.variations.length > 0) {
    const variation = faker.helpers.arrayElement(template.variations);
    Object.entries(variation).forEach(([field, rule]) => {
      (baseLog as any)[field] = evaluateLogRule(rule, context);
    });
  }

  return baseLog as LogEvent;
}

export function generateThreatLogs(
  threat: ThreatIntelligence,
  context: any = {}
): LogEvent[] {
  const logs: LogEvent[] = [];

  threat.dataSources.forEach(dataSource => {
    const template: LogTemplate = {
      baseFields: {
        user: { type: "dynamic", value: faker.internet.userName() },
        sourceIP: { type: "dynamic", value: faker.internet.ip() },
        host: { type: "dynamic", value: faker.internet.domainName() }
      }
    };

    const count = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < count; i++) {
      logs.push(generateLogFromTemplate(template, threat, dataSource, {
        ...context,
        index: i,
        total: count,
      }));
    }
  });

  return logs;
}

// Default generators for common fields
export const commonGenerators = {
  sourceIP: () => faker.internet.ip(),
  destIP: () => faker.internet.ip(),
  username: () => faker.internet.userName(),
  hostname: () => faker.internet.domainWord() + faker.number.int(100),
  timestamp: () => new Date().toISOString(),
  processName: () => faker.system.fileName(),
  filePath: () => faker.system.filePath(),
  port: () => faker.number.int({ min: 1, max: 65535 }),
  bytes: () => faker.number.int({ min: 1000, max: 1000000 }),
  userAgent: () => faker.internet.userAgent(),
  url: () => faker.internet.url(),
  email: () => faker.internet.email(),
  deviceId: () => faker.string.alphanumeric(16),
};