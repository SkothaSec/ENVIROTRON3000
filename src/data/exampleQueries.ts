import { ExampleQuery } from '../types/Query';

export const exampleQueries: ExampleQuery[] = [
  {
    id: 'auth-failed',
    title: 'Failed Authentication Attempts',
    query: 'dataSource:authentication AND result:fail',
    description: 'Find potential brute force attacks or compromised credentials',
    category: 'authentication'
  },
  {
    id: 'suspicious-process',
    title: 'Suspicious Process Execution',
    query: 'details.commandLine:*powershell*-enc*',
    description: 'Detect potentially malicious PowerShell commands',
    category: 'malware'
  },
  {
    id: 'db-operations',
    title: 'Critical Database Operations',
    query: 'dataSource:database AND operation:drop',
    description: 'Monitor destructive database operations',
    category: 'data'
  },
  {
    id: 'mobile-security',
    title: 'Mobile Security Issues',
    query: 'details.securityCheck:root_detection AND result:fail',
    description: 'Detect compromised mobile devices',
    category: 'malware'
  },
  {
    id: 'web-attacks',
    title: 'Web Application Attacks',
    query: 'dataSource:waf AND attackType:SQL\\sInjection',
    description: 'Monitor SQL injection attempts',
    category: 'malware'
  }
];