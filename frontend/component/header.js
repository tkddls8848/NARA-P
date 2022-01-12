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
                <Link href={frontUrl}>홈</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}  key='sa'>
                <Link href={frontUrl+'/task/sajeon'} key='lsa'>사전공고</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }} key='bo'>
                <Link href={frontUrl+'/task/bone'}  key='lbo'>본공고</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }} key='test'>
                <Link href={frontUrl+'/task/test'}  key='ltest'>테스트페이지</Link>
            </Typography>
        </Toolbar>
    </AppBar>
    </Box>
  )
}