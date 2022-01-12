import {Paper, Box} from '@mui/material'
import { Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function footer() {

  return (
    <Box sx={{ position: "fixed", height:'8%', width:"1",bottom: 0}} display="flex">
      <Paper sx={{ height:'1', width:"1"}} justify="center"  elevation={3}>
        <Typography align="center" variant='body1' color="inherit">
          Developed by <Link href="https://github.com/tkddls8848"><a>PSI</a></Link>
        </Typography>
      </Paper>
    </Box>
  );
}
