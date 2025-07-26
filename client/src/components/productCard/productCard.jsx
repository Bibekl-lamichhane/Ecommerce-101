import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Reaction from '../reaction/Reaction';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { addProductInCart, addProductInWishList } from '@/redux/reducerSlices/productSlice';
import { Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function ProductCard({ product}) {
const dispatch=useDispatch()
const{wishListItems}=useSelector(state=>state.product)
const exits =wishListItems.find(item=>product.id==item.id)
 const setColor= (exits ? 'red' :'grey')
  return (<div>
     <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , padding:'4px 0px'}}>
      <IconButton  onClick={()=>dispatch(addProductInWishList(product))} sx={{ alignSelf: 'flex-end', mt: 'auto' ,position:'absolute'  }}>
               <FavoriteIcon  sx={{color:setColor}}/>
              </IconButton>
      <CardMedia
        component="img"
        alt={product.slung}
        image={product.images}
         sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'}}>
          {product.title}
        </Typography>
        </CardContent>
        <CardContent className='min-h-20'>
        <Typography variant="body2" sx={{ color: 'text.secondary' ,overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical', }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions  className='flex justify-around'>
        <Stack direction="row" spacing={10}>
  <Chip label="HotSale" color="primary" variant="outlined" />
  <Chip label={`${product.price} NRS `} color="primary" />
</Stack>
</CardActions>
    </Card></div>
  );
}
