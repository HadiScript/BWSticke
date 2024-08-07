import { useEffect, useState } from "react";
import TopHeader from "../Header/TopHeader";
import DataBg from "../DataBg";
import Footer from "../Home/Footer";
import Sidebar from "../Header/Sidebar";
import Navbar from "../Header/Navbar";


const ClientLayout = ({ children, from, categories }) => {


  const [scroll, setScroll] = useState(0);
  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

  // CartSidebar
  const [isCartSidebar, setCartSidebar] = useState(false);
  const handleCartSidebar = () => setCartSidebar(!isCartSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);





  return (
    <>
      <DataBg />
      <Navbar
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />
      {/* <TopHeader  scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isCartSidebar={isCartSidebar}
          handleCartSidebar={handleCartSidebar} /> */}
      <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
      {children}


      <Footer />

    </>
  )
}



export default ClientLayout