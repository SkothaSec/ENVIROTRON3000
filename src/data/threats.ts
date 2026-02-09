import { LogSource } from '../types/LogEvent';
import { createQueryParser } from '../utils/queryParser';

export interface ThreatIndicator {
  field: string;
  pattern: string | RegExp;
  description: string;
  matchType: 'exact' | 'pattern' | 'range' | 'threshold';
  value?: string | number | string[];
  threshold?: number;
}

export interface DetectionRule {
  name: string;
  description: string;
  condition: string;
  query: string;
  threshold?: number;
  timeWindow?: number;
}

export interface ThreatIntelligence {
  id: string;
  title: string;
  description: string;
  mitreId?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  dataSources: LogSource[];
  detectionRules: DetectionRule[];
  version: string;
  created: string;
  updated: string;
}

export const threats: ThreatIntelligence[] = [
  {
    id: 'T1001',
    title: 'Brute Force Authentication Attempt',
    description: 'Multiple failed authentication attempts indicating a possible brute force attack.',
    mitreId: 'T1110',
    severity: 'Critical',
    dataSources: ['authentication', 'vpn'],
    detectionRules: [
      {
        name: 'Failed Authentication Pattern',
        description: 'Multiple failed authentication attempts from the same source',
        condition: 'Failed authentication attempts exceed threshold',
        query: 'action:login AND result:fail AND reason:*Invalid\\spassword*|*Authentication\\sfailure*',
        threshold: 5,
        timeWindow: 5
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1002',
    title: 'Suspicious Database Activity',
    description: 'Potentially destructive database operations or unauthorized access attempts.',
    mitreId: 'T1213',
    severity: 'Critical',
    dataSources: ['database'],
    detectionRules: [
      {
        name: 'Critical Database Operations',
        description: 'Detection of potentially destructive database operations',
        condition: 'Destructive database operations detected',
        query: 'operation:drop|truncate|delete|alter AND result:success',
        threshold: 1
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1003',
    title: 'Potential Data Exfiltration',
    description: 'Large data transfers or suspicious outbound connections.',
    mitreId: 'T1048',
    severity: 'Critical',
    dataSources: ['proxy', 'firewall'],
    detectionRules: [
      {
        name: 'Large Data Transfer',
        description: 'Detection of large outbound data transfers',
        condition: 'Large outbound data transfer detected',
        query: 'direction:outbound AND bytes:>=10000000',
        threshold: 3,
        timeWindow: 60
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1004',
    title: 'Suspicious Process Execution',
    description: 'Execution of potentially malicious processes or commands.',
    mitreId: 'T1059',
    severity: 'Critical',
    dataSources: ['windows', 'linux', 'macos'],
    detectionRules: [
      {
        name: 'Suspicious Process Pattern',
        description: 'Detection of suspicious process execution patterns',
        condition: 'Suspicious process execution detected',
        query: 'action:processStart AND details.commandLine:*powershell*-enc*|*\\/c\\s*|*-c\\s* AND result:success',
        threshold: 1
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1005',
    title: 'Mobile Device Compromise',
    description: 'Indicators of compromise on mobile devices.',
    mitreId: 'T1417',
    severity: 'High',
    dataSources: ['android', 'ios'],
    detectionRules: [
      {
        name: 'Security Check Failure',
        description: 'Detection of failed security checks on mobile devices',
        condition: 'Security check failure detected',
        query: 'action:security_check AND result:fail AND details.securityCheck:root_detection|jailbreak_check',
        threshold: 1
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1006',
    title: 'Web Application Attack',
    description: 'Potential web application attacks including SQL injection and XSS.',
    mitreId: 'T1190',
    severity: 'Critical',
    dataSources: ['waf', 'proxy'],
    detectionRules: [
      {
        name: 'Web Attack Pattern',
        description: 'Detection of common web application attacks',
        condition: 'Web attack pattern detected',
        query: 'action:block AND result:blocked AND reason:*SQL\\sInjection*|*XSS*|*Command\\sInjection*',
        threshold: 2,
        timeWindow: 5
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1007',
    title: 'Privilege Escalation Attempt',
    description: 'Attempts to gain elevated system privileges.',
    mitreId: 'T1548',
    severity: 'Critical',
    dataSources: ['linux', 'windows', 'macos'],
    detectionRules: [
      {
        name: 'Privilege Escalation Pattern',
        description: 'Detection of privilege escalation attempts',
        condition: 'Privilege escalation attempt detected',
        query: 'action:processStart AND details.userContext:root|SYSTEM|Administrator AND result:success',
        threshold: 1
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1008',
    title: 'Suspicious Email Activity',
    description: 'Potentially malicious email activity.',
    mitreId: 'T1566',
    severity: 'High',
    dataSources: ['email'],
    detectionRules: [
      {
        name: 'Suspicious Email Pattern',
        description: 'Detection of suspicious email patterns',
        condition: 'Suspicious email detected',
        query: 'action:filter AND result:fail AND status:quarantined|spam AND attachment:true',
        threshold: 3,
        timeWindow: 60
      }
    ],
    version: '1.2',
    created: '2024-02-20T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1009',
    title: 'DNS Tunneling Attempt',
    description: 'Potential DNS tunneling or data exfiltration via DNS.',
    mitreId: 'T1071.004',
    severity: 'High',
    dataSources: ['dns'],
    detectionRules: [
      {
        name: 'DNS Tunneling Pattern',
        description: 'Detection of potential DNS tunneling activity',
        condition: 'DNS tunneling pattern detected',
        query: 'action:query AND result:blocked AND reason:*Suspicious\\sQuery\\sPattern*',
        threshold: 5,
        timeWindow: 10
      }
    ],
    version: '1.0',
    created: '2024-02-21T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  },
  {
    id: 'T1010',
    title: 'Critical System Status',
    description: 'Critical system metrics indicating potential system failure or resource exhaustion.',
    mitreId: 'T1499',
    severity: 'Critical',
    dataSources: ['monitoring'],
    detectionRules: [
      {
        name: 'Critical System Metrics',
        description: 'Detection of critical system metrics',
        condition: 'Critical system status detected',
        query: 'action:measure AND result:critical AND status:critical',
        threshold: 3,
        timeWindow: 5
      }
    ],
    version: '1.0',
    created: '2024-02-21T00:00:00Z',
    updated: '2024-02-21T00:00:00Z'
  }
];

export function detectThreats(logs: any[]): { threatId: string; matchedLogs: any[] }[] {
  const results: { threatId: string; matchedLogs: any[] }[] = [];
  const queryParser = createQueryParser();

  threats.forEach(threat => {
    // Filter logs by data source
    const relevantLogs = logs.filter(log => 
      threat.dataSources.includes(log.dataSource)
    );

    if (relevantLogs.length === 0) return;

    threat.detectionRules.forEach(rule => {
      // Filter logs within time window if specified
      const logsToCheck = rule.timeWindow ? relevantLogs.filter(log => {
        const cutoff = new Date();
        cutoff.setMinutes(cutoff.getMinutes() - rule.timeWindow!);
        return new Date(log.timestamp) >= cutoff;
      }) : relevantLogs;

      if (!logsToCheck.length) return;

      // Use query parser to match logs
      const matchedLogs = logsToCheck.filter(log => 
        queryParser.parseQuery(rule.query, log)
      );

      // Check if threshold is met
      if (matchedLogs.length >= (rule.threshold || 1)) {
        results.push({
          threatId: threat.id,
          matchedLogs
        });
      }
    });
  });

  return results;
}