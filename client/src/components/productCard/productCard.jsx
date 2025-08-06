import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import {
  addProductInWishList,
} from "@/redux/reducerSlices/productSlice";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import RatingCom from "../rating";
import Link from "next/link";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.product);
  const exits = wishListItems.find((item) => product._id == item._id);
  const setColor = exits ? "red" : "grey";
  return (
    <Link  href="/products/1" className="hover:shadow-2xl  cursor-pointer">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "4px 0px",
        }}
      >
        <IconButton
          onClick={() => dispatch(addProductInWishList(product))}
          sx={{ alignSelf: "flex-end", mt: "auto", position: "absolute" }}
        >
          <FavoriteIcon sx={{ color: setColor }} />
        </IconButton>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.image}
          sx={{ aspectRatio: "1/1", objectFit: "contain", padding: "6px" }}
        />
        <CardContent sx={{ padding: "8px", textAlign: "left", minHeight: "3rem", 
              maxHeight: "3rem", }}>
          <div
            className={`${ ((product.discount_price) / product.actual_price) >= 0.5? "block line-through text-amber-400" : "hidden"}`}
          >
            <div >
              <Image
                src="/disountLabel.png"
                width={45}
                height={45}
                alt="disount label"
              />
            </div>
          </div>
          </CardContent>
          <CardContent>
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Max 2 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "3rem", // Matches 2 lines roughly, for visual consistency
              maxHeight: "3rem",
              whiteSpace: "normal",
            }}
          >
            {product.name}
          </Typography>
        </CardContent>
        <CardActions>
          <RatingCom ratingValue={product.ratings}/>
        </CardActions>
        <CardActions component="div" className=" flex justify-around gap-10">
          <div
            className={`${product.discount_price != null && product.discount_price !== 0 ? "block line-through text-red-500" : "hidden"}`}
          >
            {`${product.actual_price} NRS `}
          </div>
          <div className={`${product.discount_price != null && product.discount_price !== 0 ? 'text-blue-500' : 'ml-16 text-blue-500'}`}>
              {product.discount_price}
            NRS
          </div>
        </CardActions>
      </Card>
    </Link>
  );
}
