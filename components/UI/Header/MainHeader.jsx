import { Drawer } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchingDrawer from '../Common/SearchingDrawer'
import Image from 'next/image'

export const Logo = () =>
  <div className="col-xl-2 col-lg-3">
    <div className="logo">
      {/* <span style={{ fontWeight: "550" }}>BW Strike.</span> */}
      <Link href="/">
        <Image height={80} width={110} src="/assets/img/logo/red-white.svg" alt="logo" />
      </Link>
    </div>
  </div>


export const MenuLinks = ({ categories }) => <div className="col-xl-6 col-lg-6">
  <div className="main-menu">
    <nav id="mobile-menu">
      <ul>
        <li className="">
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href={'/collections'}>Collections</Link>
        </li>
        <li className={categories ? "has-dropdown" : ""}>
          <Link href="/categories">Categories</Link>
          {categories && <ul className="submenu mega-menu">
            <ul>
              {categories?.map((cat, index) => <li key={index}>
                <Link href="/shop">{cat?.name}</Link>
              </li>)}
            </ul>
          </ul>}
        </li>

        <li className="">
          <Link href="/track">Order Tracking</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>


      </ul>
    </nav>
  </div>
</div>


export const Icons = ({ handleCartSidebar, session }) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="col-xl-4 col-lg-9">
        <div className="header-meta-info d-flex align-items-center justify-content-end">
          <div className="header-meta__social  d-flex align-items-center ">
            <Link href={'/cart'} className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
              <i className="fal fa-shopping-cart" />
              <span className="tp-product-count">9</span>
            </Link>
            <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
              <i className="fal fa-heart" />
              <span className="tp-product-count">9</span>
            </Link>
            <div role='button' onClick={() => setOpen(true)} className="other header-cart p-relative tp-cart-toggle text-white">
              <i className="fal fa-search" />
            </div>
            {!session &&
              <Link href="/sign-in">
                <i className="fal fa-user" />
              </Link>
            }
            {session &&
              <Link href="/profile">
                <i className="fal fa-user" />
              </Link>
            }
          </div>
        </div>
      </div>

      <SearchingDrawer open={open} setOpen={setOpen} />
    </>
  )
}

const MainHeader = ({ categories }) => {

  const { session } = useSelector((state) => state.localSession);

  const handleCartSidebar = () => { }
  // {session && (
  //   <Link href="/profile">
  //     <span>{session.user.name}</span>
  //   </Link>
  // )}

  return (
    <div id="header-sticky" className="logo-area d-none d-xl-block mainmenu-5">
      <div className="container">
        <div className="row align-items-center">
          <Logo />
          <MenuLinks categories={categories} />

          <Icons handleCartSidebar={handleCartSidebar} session={session} />
        </div>
      </div>
    </div>
  )
}

export default MainHeader