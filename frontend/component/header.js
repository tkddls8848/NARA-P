import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Input ,InputBase, inputBaseClasses, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon/>
            </IconButton>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}>
                <Link href="http://localhost:3000">홈</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}>
                <Link href="http://localhost:3000/task/sajeon">사전공고</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}>
                <Link href="http://localhost:3000/task/bone">본공고</Link>
            </Typography>
            <Typography variant="h10" component="div" sx={{ flexGrow: 0.05 }}>
                <Link href="http://localhost:3000/task/test">test</Link>
            </Typography>
        </Toolbar>
    </AppBar>
    <div>
        <Input></Input>
    </div>
    </Box>
  );
}