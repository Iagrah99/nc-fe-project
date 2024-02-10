import textStyles from "../css/TextCSSModule.module.css"

const Header = () => {
  return ( 
    <header style={{marginBlock: "2rem"}}>
      <h1 className={textStyles.center}>Welcome To <span className={textStyles.red}>NC</span> News</h1>
    </header>
   )
}
 
export default Header;