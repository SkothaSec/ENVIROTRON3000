import { LogSource, LogSeverity, LogEvent } from './LogEvent';

export type ThreatSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

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
  severity: ThreatSeverity;
  dataSources: LogSource[];
  detectionRules: DetectionRule[];
  version: string;
  created: string;
  updated: string;
}

export interface ThreatDetectionResult {
  threatId: string;
  matchedLogs: LogEvent[];
  severity: ThreatSeverity;
  confidence: number;
  detectionTime: string;
}

export function mapThreatToLogSeverity(severity: ThreatSeverity): LogSeverity {
  switch (severity) {
    case 'Critical': return 'Critical';
    case 'High': return 'Warning';
    case 'Medium':
    case 'Low':
      return 'Info';
    default: return 'Info';
  }
}