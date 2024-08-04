import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";
import { MdDashboard, MdLogout } from "react-icons/md";

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
  const { data: session } = useSession();
  return (
    <>
      <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
        <button className="tpsideinfo__close" onClick={handleMobileMenu}>
          Close
          <i className="fal fa-times ml-10" />
        </button>

        <div className="tpsideinfo__nabtab pt-35">
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
              <MobileMenu />
            </div>
            <div className="tpsideinfo__account-link  " >
              {
                !session && <Link href="/sign-in" className="">
                  <i className="fal fa-user" /> Login / Register
                </Link>
              }
              {session && (session.user.a || session.user.s.status) &&
                <Link href={'/dashboard'} role='button'  >
                  <MdDashboard size={20} /> <span>Dashboard</span>
                </Link>
              }

            </div>
            <div className="tpsideinfo__account-link  " >
              {session &&
                <Link href={'/profile'} role='button' >  <i className="fal fa-user" /> Profile </Link>
              }
            </div>



            <div className="tpsideinfo__wishlist-link">
              <Link href="/wishlist" target="_parent">
                <i className="fal fa-heart" /> Wishlist
              </Link>
            </div>
            <div className="tpsideinfo__account-link  " >
              {session &&
                <Link href={'#'} onClick={() => signOut({ callbackUrl: "/" })} role='button' className="d-flex gap-2 align-items-center">  <MdLogout size={20} /> <span>Sign Out</span> </Link>
              }
            </div>
          </div>
        </div>



      </div>
      <div className={`body-overlay ${isMobileMenu ? "opened" : ""}`} onClick={handleMobileMenu} />
    </>
  );
}
