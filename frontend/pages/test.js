import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useState } from "react"

export default function BasicDateRangePicker() {
  const [dateRange, setDateRange] = useState([null, null])



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        beginDate="beginDate"
        endDate="endDate"
        value={dateRange}
        onChange={(newValues) => {
          setDateRange(newValues)
          {console.log(newValues)}
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
}