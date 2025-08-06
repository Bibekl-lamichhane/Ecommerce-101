import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function RatingCom(props) {
  return (
      <Rating  name="simple-controlled" defaultValue={props.ratingValue} precision={0.5} readOnly />
    
  );
}