// import CartShow from "@/components/elements/CartShow";
// import WishListShow from "@/components/elements/WishListShow";
import Link from "next/link";
import SmallTopHeader from "./SmallTopHeader";
import MainHeader from "./MainHeader";
import StickyHeader from "./StickyHeader";
import HeaderMobSticky from "./HeaderMobSticky";
// import HeaderMobSticky from "../HeaderMobSticky";
// import HeaderSticky from "../HeaderSticky";
// import HeaderTabSticky from "../HeaderTabSticky";

export default function TopHeader({ scroll, isMobileMenu, handleMobileMenu, categories }) {
  return (
    <>
      <header className="top-header ">
        <SmallTopHeader />
        <MainHeader categories={categories}/>
      </header>
      <StickyHeader scroll={scroll} />

      <HeaderMobSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
      // isCartSidebar={isCartSidebar}
      // handleCartSidebar={handleCartSidebar}
      />


      {/* <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
      <HeaderTabSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />
      <HeaderMobSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      /> */}
    </>
  );
}
