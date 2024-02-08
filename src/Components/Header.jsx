import textStyles from "../css/TextCSSModule.module.css"

const Header = () => {
  return ( 
    <header style={{marginBlock: "25px"}}>
      <h1 className={textStyles.center}><span className={textStyles.red}>NC</span> News</h1>
    </header>
   )
}
 
export default Header;