import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollButton = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FaArrowCircleUp onClick={scrollToTop} className='scale-175 cursor-pointer'/>
  );
}

export default ScrollButton; 
