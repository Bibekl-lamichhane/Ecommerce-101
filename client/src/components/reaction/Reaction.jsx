"use state";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { grey, blue, orange, pink } from "@mui/material/colors";
const Reaction = () => {
  const [reactionDiv, setreactionDiv] = useState(false);
  const [like, setliked] = useState(false);
  const [currentReaction, setcurrentReaction] = useState("like")
  

  const handelSymbolChange = (newReaction) => {
    
    if (newReaction == "like") {
      const newLike = !like;
      setliked(newLike);
      setcurrentReaction("like");
    } else if (newReaction == "love") {
      if(newReaction==currentReaction){
        setcurrentReaction("like");
        return
      }
        setcurrentReaction("love");
       
      }
  else if (newReaction == "laugh") {
    if(newReaction==currentReaction){
        setcurrentReaction("like");
      }
      else{
setcurrentReaction("laugh")}
      }
        
    setreactionDiv(false);
  };

  const generateReaction=()=>{
     if (currentReaction == "like") {
      
       return( <ThumbUpIcon onClick={()=>handelSymbolChange("like")}  sx={{ color: like ? blue[500] : grey[500] }} />)
    } 
    else if (currentReaction == "love") {
    
      return(  <FavoriteIcon onClick={()=>handelSymbolChange("love")}
        sx={{ color: pink[500] }} />)
      }
       else if (currentReaction == "laugh") {
       return( <SentimentVerySatisfiedIcon   onClick={()=>handelSymbolChange("laugh")} sx={{ color: orange[500] }} />)
  }
  }
  const ReactionDiv = () => {
    return (
      <div className="my-2 w-26">
        <ThumbUpIcon
          onClick={() => handelSymbolChange("like")}
          sx={{ color:!like?blue[500]:grey[500]}}
        />
        <FavoriteIcon
          onClick={() => handelSymbolChange("love")}
          className="mx-3.5"
          sx={{ color: pink[500] }}
        />
        <SentimentVerySatisfiedIcon
          onClick={() => handelSymbolChange("laugh")}
          sx={{ color: orange[500] }}
        />
      </div>
    );
  };

  return (
    <div onMouseLeave={() => setreactionDiv(false)} className="">
      {reactionDiv && <ReactionDiv />}
      <div
        onMouseEnter={() => setreactionDiv(true)}
        className="bg-gray-300 border-gray-900 rounded-3xl p-1 w-8"
      >
        {generateReaction()}
      </div>
    </div>
  );
};
export default Reaction;
