import { 
  ThreatDetectionResult,
  DetectionRule 
} from '../types/ThreatIntelligence';
import { LogEvent } from '../types/LogEvent';
import { threats } from '../data/threats';

function evaluateRule(logs: LogEvent[], rule: DetectionRule): boolean {
  if (!logs.length) return false;

  // Filter logs within time window if specified
  const logsToCheck = rule.timeWindow ? logs.filter(log => {
    const cutoff = new Date();
    cutoff.setMinutes(cutoff.getMinutes() - rule.timeWindow!);
    return new Date(log.timestamp) >= cutoff;
  }) : logs;

  if (!logsToCheck.length) return false;

  // Parse and evaluate condition
  try {
    const condition = rule.condition.toLowerCase();
    
    // Handle basic conditions
    if (condition.includes(' and ')) {
      return condition.split(' and ').every(subCond => 
        evaluateCondition(logsToCheck, subCond.trim())
      );
    }
    
    if (condition.includes(' or ')) {
      return condition.split(' or ').some(subCond => 
        evaluateCondition(logsToCheck, subCond.trim())
      );
    }
    
    return evaluateCondition(logsToCheck, condition);
  } catch (error) {
    console.error('Error evaluating rule:', error);
    return false;
  }
}

function evaluateCondition(logs: LogEvent[], condition: string): boolean {
  // Handle count-based conditions
  if (condition.startsWith('count')) {
    const matches = condition.match(/count\s*>\s*(\d+)/);
    if (matches) {
      return logs.length > Number(matches[1]);
    }
  }

  // Handle field-based conditions
  const fieldMatch = condition.match(/(\w+)\s*(=|!=|>|<|>=|<=|in)\s*(.+)/);
  if (fieldMatch) {
    const [, field, operator, rawValue] = fieldMatch;
    
    return logs.some(log => {
      const logValue = (log as any)[field];
      const compareValue = rawValue.replace(/['"()]/g, '').trim();

      switch (operator) {
        case '=': return String(logValue) === compareValue;
        case '!=': return String(logValue) !== compareValue;
        case '>': return Number(logValue) > Number(compareValue);
        case '<': return Number(logValue) < Number(compareValue);
        case '>=': return Number(logValue) >= Number(compareValue);
        case '<=': return Number(logValue) <= Number(compareValue);
        case 'in': return compareValue.split(',').map(v => v.trim()).includes(String(logValue));
        default: return false;
      }
    });
  }

  return false;
}

export function detectThreats(logs: LogEvent[]): ThreatDetectionResult[] {
  const results: ThreatDetectionResult[] = [];

  threats.forEach(threat => {
    // Get relevant logs for this threat
    const relevantLogs = logs.filter(log => 
      threat.dataSources.includes(log.dataSource)
    );

    if (!relevantLogs.length) return;

    // Find logs matching detection rules
    const matchedLogs = relevantLogs.filter(log =>
      threat.detectionRules.some(rule => evaluateRule([log], rule))
    );

    if (!matchedLogs.length) return;

    // Calculate confidence score
    const confidence = (matchedLogs.length / relevantLogs.length) * 100;

    results.push({
      threatId: threat.id,
      matchedLogs,
      severity: threat.severity,
      confidence,
      detectionTime: new Date().toISOString()
    });
  });

  return results;
}