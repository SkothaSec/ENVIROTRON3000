import { useState } from 'react';
import { Box, TextField, IconButton, Tooltip, InputAdornment, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface QueryBoxProps {
  queryString: string;
  onQueryChange: (query: string) => void;
  onShowExamples: () => void;
}

export default function QueryBox({ queryString, onQueryChange, onShowExamples }: QueryBoxProps) {
  const [inputValue, setInputValue] = useState(queryString);

  const handleQueryKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onQueryChange(inputValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onQueryChange(inputValue);
  };

  return (
    <Card className="gradient-border" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <TextField
            fullWidth
            label="Query Logs"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleQueryKeyPress}
            placeholder="Example: severity:Critical AND user:John"
            helperText="Use field:value syntax with AND operator. Supports wildcards (*)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch} size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="View Example Queries">
            <IconButton onClick={onShowExamples} sx={{ mt: 1 }}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}