import { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useSimulatorStore } from '../../store/simulatorStore';
import { LogEvent } from '../../types/LogEvent';
import LogsPanel from '../LogsPanel';
import { LogsOverTimeChart } from './charts/LogsOverTimeChart';
import LogsBySeverityChart from './charts/LogsBySeverityChart';
import LogsBySourceChart from './charts/LogsBySourceChart';
import QueryBox from './search/QueryBox';
import ExampleQueriesDialog from './search/ExampleQueriesDialog';
import { exampleQueries } from '../../data/exampleQueries';
import { createQueryParser } from '../../utils/queryParser';

export default function LogAnalysisView() {
  const { logsBySource, orgData } = useSimulatorStore();
  const [queryString, setQueryString] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const queryParser = createQueryParser();

  if (!logsBySource || !orgData) return null;

  const allLogs = Object.entries(logsBySource)
    .filter(([source]) => orgData.dataSources.includes(source))
    .reduce((acc, [, logs]) => {
      acc.push(...logs);
      return acc;
    }, [] as LogEvent[]);

  const filteredLogs = queryString
    ? allLogs.filter(log => queryParser.parseQuery(queryString, log))
    : allLogs;

  const sourceMetrics = filteredLogs.reduce((acc, log) => {
    acc[log.dataSource] = (acc[log.dataSource] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const logsBySeverity = filteredLogs.reduce((acc, log) => {
    acc[log.severity] = (acc[log.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExampleClick = (query: string) => {
    setQueryString(query);
    setShowExamples(false);
  };

  return (
    <Box>
      <QueryBox
        queryString={queryString}
        onQueryChange={(newQuery) => {
          setQueryString(newQuery);
        }}
        onShowExamples={() => setShowExamples(true)}
      />

      <ExampleQueriesDialog
        open={showExamples}
        onClose={() => setShowExamples(false)}
        examples={exampleQueries}
        onSelectQuery={handleExampleClick}
      />

      <Card className="gradient-border" sx={{ mb: 3 }}>
        <CardContent>
          <LogsPanel logs={filteredLogs} />
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="gradient-border">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Log Volume Over Time
              </Typography>
              <LogsOverTimeChart logs={filteredLogs} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="gradient-border">
            <CardContent>
              <LogsBySeverityChart data={logsBySeverity} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="gradient-border">
            <CardContent>
              <LogsBySourceChart data={sourceMetrics} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}