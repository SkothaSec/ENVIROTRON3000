export interface ExampleQuery {
  id: string;
  title: string;
  query: string;
  description: string;
  category: 'authentication' | 'network' | 'malware' | 'data' | 'system';
}

export interface QueryParser {
  parseQuery: (query: string, data: any) => boolean;
}

export interface SavedQuery {
  id: string;
  name: string;
  query: string;
  description?: string;
  created: string;
  updated: string;
}

export interface QueryMatch {
  field: string;
  value: any;
  matched: boolean;
  pattern?: string;
}

export interface QueryResult {
  matches: QueryMatch[];
  score: number;
}