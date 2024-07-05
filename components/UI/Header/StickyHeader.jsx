import { Icons, Logo, MenuLinks } from "./MainHeader"


const StickyHeader = ({ scroll }) => {

  const handleCartSidebar = () => { }
  return (
    <div id="header-sticky" className={`logo-area tp-sticky-one mainmenu-5 ${scroll ? "header-sticky" : ""}`}>

      <div className="container">
        <div className="row align-items-center">
          <Logo />
          <MenuLinks />
          <Icons handleCartSidebar={handleCartSidebar} />
        </div>
      </div>
    </div>
  )
}

export default StickyHeader