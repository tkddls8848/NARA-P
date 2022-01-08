import BottomNavigation from '@mui/material/BottomNavigation'
import { Paper, Typography, Box } from '@mui/material'

const footer = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Paper sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation>
          <Typography component='div' key='footer'>This is Footer</Typography>
        </BottomNavigation>
  </Paper>
  </Box>
)

export default footer