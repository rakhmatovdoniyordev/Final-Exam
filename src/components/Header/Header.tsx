import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';


const pages = ['On Sale', 'New Arrivals', 'Brands'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [close, setClose] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #E5E5E5' }}>
        <div className={`bg-black h-12 ${close ? 'hidden' : 'block'}`}>
            <Container maxWidth="xl">
                <div className='flex items-center'>
                    <div className='flex justify-center h-12 items-center w-full text-white max-[660px]:text-[12px]'>
                        <p>Sign up and get 20% off to your first order. <a href="#" className='underline'>Sign Up Now</a></p>
                    </div>
                    <div className='flex justify-end items-center text-white max-[660px]:hidden'>
                        <button onClick={() => setClose(p => !p)}><IoClose className='text-xl font-bold'/></button>
                    </div>
                </div>
            </Container>
        </div>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='integral h-24'>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              pr: 10,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 900,
              color: 'inherit',
              fontSize: '32px',
              textDecoration: 'none',
            }}
          >
            SHOP.CO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: "center" }} >
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: 'black' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
                fontWeight: 900,
                color: 'inherit',
                fontSize: '28px',
                textDecoration: 'none',
              }}
              className='integral'
            >
              SHOP.CO
            </Typography>
            <div>
              <IoSearchOutline className='text-3xl mr-2'/>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'satoshi', alignItems: 'center' }}>
            <select name="Shop" id="" className='flex items-center satoshi text-[18px] font-normal mr-4'>
                <option value="shop" className='satoshi'>
                    Shop
                </option>
            </select>
            <div className='flex items-center gap-5 max-[1000px]:gap-0'>
                {pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block', fontFamily: "satoshi", fontSize: "16px" }}
                    className='whitespace-nowrap'
                >
                    {page}
                </Button>
                ))}
            </div>
            <div className='flex-1 mx-10'>
                <form action="" className='flex items-center gap-3 bg-[#F0F0F0] rounded-[62px] h-12'>
                    <i><IoSearchOutline className='pl-3 text-3xl'/></i>
                    <input type="search" placeholder='Search for products...' className='h-full w-full bg-[#f0f0f0] outline-none rounded-[62px] satoshi'/>
                </form>
            </div>
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <IconButton sx={{ p: 0 }}>
                <NavLink to={"cart"}><FiShoppingCart className='text-2xl text-black mr-4'/></NavLink>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <p><RxAvatar className='text-2xl text-black font-bold'/></p>
              </IconButton>
            </Tooltip>
            <Menu
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
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;