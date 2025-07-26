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
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export default function AdminDrawer({ClickHandeled,adminFeatures,onClose,openProp}) {
 
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={ClickHandeled}>
      <List>
        {adminFeatures.map((text, index) => (
        
          <ListItem key={index} disablePadding>
            <ListItemButton href={text.linkto}>
              <ListItemIcon>
                {index % 2 === 0 ? <ManageAccountsIcon/>: <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
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
