import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import { Input, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'


export default function Header() {

    const frontUrl = process.env.FRONT_URL

  return (
    <Box sx={{ flexGrow: 1 }} key="Header_Box">
    <AppBar position="static" key='Appbar'>
        <Toolbar key='Toolbar'>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} key='IconButton'>
                <MenuIcon/>
            </IconButton>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }} key='home'>
                <Link href={frontUrl}><a>홈</a></Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}  key='sa'>
                <Link href={frontUrl+'/task/sajeon'}><a>사전공고</a></Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }} key='bo'>
                <Link href={frontUrl+'/task/bone'}  key='lbo'><a>본공고</a></Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }} key='test'>
                <Link href={frontUrl+'/task/test'}  key='ltest'><a>테스트페이지</a></Link>
            </Typography>
        </Toolbar>
    </AppBar>
    </Box>
  )
}