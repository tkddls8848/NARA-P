import BottomNavigation from '@mui/material/BottomNavigation'
import { Link, Paper, Typography, Box } from '@mui/material'

const footer = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation>
          <Typography component='div' key='footer'>Developed by <Link href='https://github.com/tkddls8848'>PSI</Link></Typography>
        </BottomNavigation>
  </Paper>
  </Box>
)

export default footer