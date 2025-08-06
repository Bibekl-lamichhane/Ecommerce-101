import React from 'react'
 import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './productCard/productCard';

const CarouselCom = ({product}) => {
    const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

  return (
    <div>
<h1 className="text-3xl font-bold my-6 ml-6">Top Deals</h1>
<Carousel responsive={responsive}>
  {product.map((items)=>{
return items.products.map((item)=>{
  if(item.discount_price/(item.actual_price) >= 0.5)
return <ProductCard product={item}/>
  })
})}

</Carousel>
    </div>
  )
}

export default CarouselCom



