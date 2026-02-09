import { LocationInfo } from './LocationInfo';

export type LogSeverity = 'Info' | 'Warning' | 'Critical';
export type LogSource = 'windows' | 'linux' | 'macos' | 'android' | 'ios' | 'firewall' | 'dns' | 'email' | 'cloud' | 'vpn' | 'proxy' | 'ids' | 'waf' | 'database' | 'authentication' | 'monitoring';

// Base log event interface that all log types extend
export interface BaseLogEvent {
  id: string;
  timestamp: string;
  user: string;
  sourceIP: string;
  host: string;
  dataSource: LogSource;
  severity: LogSeverity;
  location?: LocationInfo;
  action: string;
  result: 'success' | 'fail' | 'blocked';
  details?: Record<string, any>;
}

// Operating System Logs (Windows, Linux, macOS)
export interface OSLog extends BaseLogEvent {
  eventID: number;
  action: 'logon' | 'logoff' | 'fileAccess' | 'processStart' | 'systemChange';
  result: 'success' | 'fail';
  reason?: string;
  details: {
    processName: string;
    filePath: string;
    userContext: string;
    commandLine?: string;
  };
}

// Mobile Device Logs (Android, iOS)
export interface MobileLog extends BaseLogEvent {
  eventType: 'app' | 'security' | 'system';
  action: 'app_launch' | 'app_close' | 'permission_request' | 'security_check';
  deviceId: string;
  osVersion: string;
  result: 'success' | 'fail';
  details: {
    appName?: string;
    permissionType?: string;
    securityCheck?: string;
  };
}

// Firewall Logs
export interface FirewallLog extends BaseLogEvent {
  action: 'allowed' | 'denied' | 'dropped';
  protocol: 'TCP' | 'UDP' | 'ICMP';
  port: number;
  destIP: string;
  rule: string;
  reason: string;
  direction: 'inbound' | 'outbound';
  bytes: number;
  result: 'success' | 'fail';
}

// DNS Logs
export interface DNSLog extends BaseLogEvent {
  action: 'query' | 'response';
  query: string;
  queryType: 'A' | 'AAAA' | 'MX' | 'CNAME' | 'TXT';
  result: 'success' | 'fail';
  responseIP?: string;
  ttl?: number;
  reason?: string;
}

// Email Logs
export interface EmailLog extends BaseLogEvent {
  action: 'send' | 'receive' | 'filter';
  direction: 'send' | 'receive';
  subject: string;
  sizeKB: number;
  attachment: boolean;
  recipient?: string;
  sender?: string;
  status: 'delivered' | 'failed' | 'quarantined' | 'spam';
  result: 'success' | 'fail';
  reason?: string;
}

// VPN Logs
export interface VPNLog extends BaseLogEvent {
  action: 'connect' | 'disconnect' | 'authenticate';
  sessionID: string;
  connectionType: 'connect' | 'disconnect' | 'timeout';
  duration?: number;
  bytesTransferred?: number;
  authMethod: 'certificate' | 'password';
  result: 'success' | 'fail';
  reason?: string;
}

// Proxy Logs
export interface ProxyLog extends BaseLogEvent {
  action: 'request' | 'block' | 'allow';
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  statusCode: number;
  category: string;
  blocked: boolean;
  bytes: number;
  result: 'success' | 'fail';
  reason?: string;
}

// Cloud Audit Logs
export interface CloudAuditLog extends BaseLogEvent {
  action: string;
  service: string;
  resource: string;
  result: 'success' | 'fail';
  reason?: string;
  region?: string;
  changes?: Record<string, any>;
}

// IDS/IPS Logs
export interface IDSLog extends BaseLogEvent {
  action: 'alert' | 'block' | 'log';
  attackType: string;
  signature: string;
  priority: number;
  payload?: string;
  destIP: string;
  destPort: number;
  result: 'success' | 'fail';
  reason?: string;
}

// Web Application Firewall Logs
export interface WAFLog extends BaseLogEvent {
  action: 'block' | 'challenge' | 'allow';
  requestURL: string;
  attackType: string;
  ruleID: string;
  clientIP: string;
  userAgent: string;
  country: string;
  result: 'success' | 'fail' | 'blocked';
  reason?: string;
}

// Database Logs
export interface DatabaseLog extends BaseLogEvent {
  action: 'query' | 'modify' | 'admin';
  operation: 'select' | 'insert' | 'update' | 'delete' | 'create' | 'alter' | 'drop';
  database: string;
  table: string;
  affectedRows?: number;
  query?: string;
  result: 'success' | 'fail' | 'blocked';
  reason?: string;
}

// Authentication Logs
export interface AuthenticationLog extends BaseLogEvent {
  action: 'login' | 'logout' | 'mfa' | 'password_change';
  method: 'password' | 'mfa' | 'sso' | 'token';
  service: string;
  result: 'success' | 'fail';
  reason?: string;
  location?: LocationInfo;
}

// System Monitoring Logs
export interface MonitoringLog extends BaseLogEvent {
  action: 'measure' | 'alert' | 'heartbeat';
  metric: string;
  value: number;
  unit: string;
  threshold?: number;
  status: 'normal' | 'warning' | 'critical';
  component: string;
  result: 'success' | 'fail';
  reason?: string;
}

// Union type of all log events
export type LogEvent =
  | OSLog
  | MobileLog
  | FirewallLog
  | DNSLog
  | EmailLog
  | VPNLog
  | ProxyLog
  | CloudAuditLog
  | IDSLog
  | WAFLog
  | DatabaseLog
  | AuthenticationLog
  | MonitoringLog;

export const LogSourceDisplayNames: Record<LogSource, string> = {
  windows: 'Windows Events',
  linux: 'Linux System',
  macos: 'macOS System',
  android: 'Android Devices',
  ios: 'iOS Devices',
  firewall: 'Firewall',
  dns: 'DNS',
  email: 'Email',
  cloud: 'Cloud Audit',
  vpn: 'VPN',
  proxy: 'Web Proxy',
  ids: 'IDS/IPS',
  waf: 'Web Application Firewall',
  database: 'Database Audit',
  authentication: 'Authentication',
  monitoring: 'System Monitoring'
};

export const LogSeverityColors: Record<LogSeverity, string> = {
  Info: '#2196f3',
  Warning: '#ff9800',
  Critical: '#f44336'
};