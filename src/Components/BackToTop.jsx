import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollButton = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FaArrowCircleUp onClick={scrollToTop} className='fa-2x cursor-pointer'/>
  );
}

export default ScrollButton; 
