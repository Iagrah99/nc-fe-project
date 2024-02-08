import { FaArrowCircleUp } from 'react-icons/fa'; 

const ScrollButton = () =>{ 
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,   
      behavior: 'smooth'
    }); 
  }; 
  
  return ( 
     <FaArrowCircleUp onClick={scrollToTop} style={{cursor: "pointer", fontSize: "2rem"}}/>
  ); 
} 
  
export default ScrollButton; 
