import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
export default function UserDrawer({ClickHandeled,onClose,openProp}) {
   const{isLoggedIn}=useSelector(state=>state.user)
   const{Features}=useSelector(state=>state.admin)

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={ClickHandeled}>
        <List className='flex justify-center items-center '><Image src="/KIN MEL.png" width={50} height={50} alt="logo" className=""/></List>
      <List>
        {Features.map((text, index) => (
        
          <ListItem key={index} disablePadding>
            <ListItemButton href={text.linkto}>
              <ListItemIcon>
                 {(text.name=='Home')?<HomeIcon/>:(text.name=='Shop Now')?<ShoppingCartIcon/>:(text.name=='Contact Us')?<InboxIcon/>:(text.name=='About Us')?<InfoIcon/>:(text.name=='Contact Us')?<InfoIcon/>:(text.name=='Wish List')?<FavoriteIcon/>:null}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
              <Divider />
        {!isLoggedIn && (
          <div className="md:hidden flex gap-6 m-4  ">
            <Button component ={Link} href="/register" variant="outlined" >
              Signup
            </Button>
            <Button component ={Link} href="/login">
              Login
            </Button>
          </div>
        )}
        </List>
      <Divider />
    </Box>
  );

  return (
    <div>
     
      <Drawer open={openProp} >
        <CloseIcon onClick={onClose} className='w-6 ml-[86%] mt-2'/>
        {DrawerList}
      </Drawer>
    </div>
  );
}
