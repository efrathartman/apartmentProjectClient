import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '../components/navbar.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

import { Link, useNavigate } from "react-router-dom";
import { AdbOutlined, Radio } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../users/userSlice';
import { useState } from 'react';
import { useRef } from 'react';



const pages = ['כניסה', 'התחברות', 'קטגוריות','דירות','משתמשים'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const top100Films = [
  { label: 'צימר',year:1994},
  { label: 'וילה',year:1995 },
  { label: 'קמפוס',year:1998 },

];
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,

});

function ResponsiveAppBar({ isLoggedIn }) {
  const leave=()=>{
    setCurrent(null);
    setCurrentname(null)
  }
  // const[searching,setSearching]=useState(null)
  const navigate = useNavigate();
const inputRef = useRef();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log(useSelector(state=>state.users));
  // const current=useSelector(state=>state.users.nameLogin)
    // const[current,setCurrent]=useState()
    const [current, setCurrent] = useState(localStorage.getItem('currentuser') || null);
    // window.location.reload();
    localStorage.getItem("currentuser",current);
    const [currentname, setCurrentname] = useState(localStorage.getItem('currentname') || null);
// localStorage.getItem("currentuser",current);
   console.log(current,"koko");
  console.log(currentname)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    navigate('/tabs')
    // setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function search()
  {
    const value = inputRef.current.value;
    console.log(value,"ref");
    if(value==="צימר")
  {
    console.log("צימרוששששששש");
    
    navigate('/typeOfApartment/8')
  }
  else{
    if(value==="קמפוס")
    {
      navigate('typeOfApartment/10')
    }
      else{
       navigate('typeOfApartment/9')
      }
  }

   
  
  }
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Avatar size="large" variant="square" alt="Remy Sharp" src="https://images.unsplash.com/photo-1588436706487-9d55d73a39e3" />
          <Typography
          
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu" to={''}
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Apartment
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Apartment
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link underline={true} to={'signIn'} className='link'>
              <Button variant="outlined" sx={{my:2 ,color:'white', display:'block'}}>כניסה</Button>
            </Link>
            <Link underline={true} to={'signUp'} className='link'>
              <Button variant="outlined" sx={{my:2 ,color:'white', display:'block'}}>הרשמה</Button>
            </Link>
            <Link underline={true} className='link'>
              <Button onClick={leave}  variant="outlined" sx={{my:2 ,color:'white', display:'block'}}>התנתקות</Button>
            </Link>
         
              <Link underline={true} to={'apartments'}  className='link'>
              <Button variant="outlined" sx={{my:2 ,color:'white', display:'block'}}>דירות</Button>
             </Link>
             <Link underline={false} to={'about'} className='link'>
              <Button variant="outlined" sx={{my:2 ,color:'white', display:'block'}}>אודות</Button>
            </Link>
          
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

     
          {current &&    <Link to={'upload'}>
          <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{borderRadius:"40px"}}
      // startIcon={<CloudUploadIcon />}
    >
     העלאת דירה
      <VisuallyHiddenInput type="file" />
    </Button>
    </Link>}

          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      noOptionsText="אין תוצאות"
      // value={searching}
      
      sx={{ width: 150,marginTop:"2px",marginRight:"20px",display:"inline-block"}}
      renderInput={(params) => <TextField sx={{display:"inline-block"}} {...params} label="חיפוש" inputRef={inputRef}/>
    }  
    />
    
    {/* <Button > */}
    <SearchIcon onClick={search}/>
    {/* </Button> */}
         <Box sx={{ flexGrow: 0,marginRight:"20px" }}>
           {current &&  <Tooltip title={current.name}> 
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentname} src="/static/images/avatar/2.jpg" />
              </IconButton> 
 
            </Tooltip>}
            {!current &&  <Tooltip title=''> 
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentname} src="/static/images/avatar/2.jpg" />
              </IconButton> 
 
            </Tooltip>}
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
     
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;