import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Header() {

    const menus = ["홈","공고검색"]
    const router = useRouter()

    const menuClick = (e) => {
        const type = e.target.id
        console.log(type)
        switch (type) {
            case menus[0]:
                router.push('/')
                break
            case menus[1]:
                router.push('/task/naraSearch')
                break
            default:
                console.log("NOT MENU")
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }} key="Header_Box">
            <AppBar position="static" key='Appbar'>
                <Toolbar key='Toolbar'>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 0.05 }} key='home'>
                        NARA-P
                    </Typography>
                        {menus.map((menu) => (
                            <Button variant='contained' onClick={menuClick} id={menu} key={menu}  disableElevation>{menu}</Button>
                        ))}
                </Toolbar>
            </AppBar>
        </Box>
  )
}