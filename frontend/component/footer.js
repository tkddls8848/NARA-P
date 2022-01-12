import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function footer() {

  return (
    <Box sx={{ position: "fixed", height:50 ,bottom: 0, left: "50%",  justifyContent: "center", alignItems: "center"}}>
      <Container maxWidth="md">
        <Typography align="center" variant='body1' color="inherit">
          Developed by <Link href="https://github.com/tkddls8848"><a>PSI</a></Link>
        </Typography>
      </Container>
    </Box>
  );
}
