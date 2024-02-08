import { useState } from 'react'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'

function LikeButton() {
  const[liked, setLiked] = useState(false);
  const handleClick = () => {
    setLiked(!liked);
  };
  if(liked)
    return (<AiFillLike
      color="green" 
      size="40" 
      onClick={handleClick}/>)
  return (<AiFillDislike
    color="red" 
    size="40" 
    onClick={handleClick}/>)  
}

export default LikeButton