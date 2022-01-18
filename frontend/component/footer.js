import { Paper, Box } from '@mui/material'
import { Container, Typography, Link } from '@mui/material'

export default function footer() {

  return (
    <Box>
      <Paper sx={{  position: "fixed", height: 0.1, width:1, bottom:0}} elevation={3}>
        <Container maxWidth="sm" align='center' flexDirection= "column"  justifyContent= "center">
          <Typography>Developed by <Link underline="hover" href="https://github.com/tkddls8848">PSI</Link> </Typography>
        </Container>
      </Paper>
      </Box>
  )
}
