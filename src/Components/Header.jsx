import textStyles from "../css/TextCSSModule.module.css"

const Header = () => {
  return ( 
    <h1 className={textStyles.center}><span className={textStyles.red}>NC</span> News</h1>
   );
}
 
export default Header;