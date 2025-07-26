"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/joy";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { setisLoggedIn, setisLoggedOut } from "@/redux/reducerSlices/userSlice";

export default function NavBar({ClickHandeled}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cartItems } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mt-2 px-2 md:px-4">
         <Image src="/KIN MEL.png" width={40} height={40} alt="logo" className="hidden md:block  ml-6 lg:ml-12" />
        <div className="md:hidden mx-6">
         <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={ClickHandeled}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Box
          sx={{
            display: {
              xs: "none", // hidden on extra small
              sm: "flex", // hidden on small
              md: "flex", // visible on medium and up
            },
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Link href="/">
            <Typography
              sx={{ minWidth: 100, fontSize: 15, marginX: 2, fontWeight: 500 }}
              className=" hover:text-blue-400 hover:cursor-pointer "
            >
              Home
            </Typography>
          </Link>
          <Link href="/shopnow">
            <Typography
              sx={{ minWidth: 100, fontSize: 15, marginX: 2, fontWeight: 500 }}
              className=" hover:text-blue-400 hover:cursor-pointer "
            >
              Shop Now
            </Typography>
          </Link>
          <Link href="/contactus">
            <Typography
              sx={{ minWidth: 100, fontSize: 15, marginX: 2, fontWeight: 500 }}
              className=" hover:text-blue-400 hover:cursor-pointer "
            >
              Contact Us
            </Typography>
          </Link>
          <Link href="/aboutus">
            <Typography
              sx={{ minWidth: 100, fontSize: 15, marginX: 2, fontWeight: 500 }}
              className=" hover:text-blue-400 hover:cursor-pointer "
            >
              About Us
            </Typography>
          </Link>
          <Link href="/wishlist">
            <Typography
              sx={{ minWidth: 100, fontSize: 15, marginX: 2, fontWeight: 500 }}
              className=" hover:text-blue-400 hover:cursor-pointer "
            >
              Wish List Products
            </Typography>
          </Link>
        </Box>
         
        <div className="flex justify-between items-center gap-4">
            <IconButton className="">
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={cartItems.length} color="primary" overlap="circular" />
            </IconButton>
          {isLoggedIn && (
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>RB</Avatar>
              </IconButton>
            </Tooltip>
          )}
        
        {!isLoggedIn && (
          <div className="md:flex gap-2 mt-2 hidden ">
            <Button component={Link} href="/register" variant="outlined" >
              Signup
            </Button>
            <Button component={Link} href="/login">
              Login
            </Button>
          </div>
        )}
      </div>
     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link href="/login" onClick={() => dispatch(setisLoggedOut())}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
       </div>
    </React.Fragment>
  );
}
