import { FaArrowCircleUp } from 'react-icons/fa';
import navLinkStyles from "../css/NavLinkCSSModule.module.css"

const ScrollButton = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FaArrowCircleUp onClick={scrollToTop} className={navLinkStyles.arrowIcon} />
  );
}

export default ScrollButton; 
