import { QueryParser } from '../types/Query';

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createSearchPattern(value: string): RegExp {
  // Remove quotes if present
  const unquoted = value.replace(/^["'](.*)["']$/, '$1');
  
  // Handle regex patterns
  if (unquoted.startsWith('/') && unquoted.endsWith('/')) {
    return new RegExp(unquoted.slice(1, -1), 'i');
  }

  // Handle wildcards and special patterns
  if (unquoted.includes('*') || unquoted.includes('?')) {
    const pattern = unquoted
      .split(/(\*|\?)/)
      .map(part => {
        if (part === '*') return '.*';
        if (part === '?') return '.';
        return escapeRegExp(part);
      })
      .join('');
    return new RegExp(`^${pattern}$`, 'i');
  }
  
  // Handle exact matches (quoted strings)
  if (value.startsWith('"') || value.startsWith("'")) {
    return new RegExp(`^${escapeRegExp(unquoted)}$`, 'i');
  }
  
  // Default to contains match
  return new RegExp(escapeRegExp(unquoted), 'i');
}

export const createQueryParser = (): QueryParser => ({
  parseQuery: (query: string, log: any): boolean => {
    if (!query?.trim()) {
      return true;
    }

    // Split on AND/OR operators while preserving quoted strings and patterns
    const terms = query.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    let result = true;
    let isOr = false;

    for (let i = 0; i < terms.length; i++) {
      const term = terms[i].trim();

      if (term.toLowerCase() === 'and') {
        continue;
      }
      if (term.toLowerCase() === 'or') {
        isOr = true;
        continue;
      }

      let termResult = false;

      if (term.includes(':')) {
        const [field, ...rest] = term.split(':');
        const value = rest.join(':').trim();
        
        if (!field || !value) {
          termResult = false;
        } else {
          const logValue = getNestedValue(log, field.trim());
          if (logValue === undefined) {
            termResult = false;
          } else {
            // Handle OR conditions with pipes
            if (value.includes('|')) {
              const options = value.split('|')
                .map(v => v.trim())
                .filter(v => v); // Remove empty strings
              
              termResult = options.some(option => {
                const pattern = createSearchPattern(option);
                return pattern.test(String(logValue));
              });
            } else {
              const pattern = createSearchPattern(value);
              termResult = pattern.test(String(logValue));
            }
          }
        }
      } else {
        // Handle OR conditions in full text search
        if (term.includes('|')) {
          const options = term.split('|').map(t => t.trim());
          termResult = options.some(option => {
            const pattern = createSearchPattern(option);
            return Object.values(log).some(val => {
              if (val === null || val === undefined) return false;
              if (typeof val === 'object') {
                return Object.values(val).some(v => pattern.test(String(v)));
              }
              return pattern.test(String(val));
            });
          });
        } else {
          // Full text search
          const pattern = createSearchPattern(term);
          termResult = Object.values(log).some(val => {
            if (val === null || val === undefined) return false;
            if (typeof val === 'object') {
              return Object.values(val).some(v => pattern.test(String(v)));
            }
            return pattern.test(String(val));
          });
        }
      }

      if (isOr) {
        result = result || termResult;
        isOr = false;
      } else {
        result = result && termResult;
      }
    }

    return result;
  }
});