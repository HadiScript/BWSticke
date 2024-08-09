import { Menu } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";

import { MdOutlineCategory, MdOutlineDashboard, MdOutlineFeaturedPlayList, MdOutlinePinch, MdPayment } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineBgColors } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";



const list = [
  {
    gap: false,
    name: "Dashboard",
    path: "/subscribe",
    Icon: <MdOutlineDashboard size={16} />,
  },
  {
    gap: true,
    name: "Products",
    path: "/subscribe/quizzes",
    Icon: <MdOutlineFeaturedPlayList size={16} />,
  },
  {
    gap: false,
    name: "Orders",
    path: "/subscribe/create-quiz",
    Icon: <BsCart3 size={16} />,
  },
  {
    gap: false,
    name: "Categories",
    path: "/subscribe/create-quiz-ai",
    Icon: <MdOutlineCategory size={17} />,
  },
  {
    gap: false,
    name: "Colors",
    path: "/subscribe/global-settings",
    Icon: <AiOutlineBgColors size={20} />,
  },

  {
    gap: true,
    name: "Attributes",
    path: '/subscribe/surveys',
    Icon: <MdOutlinePinch size={17} />,
  },
  {
    gap: false,
    name: "Brands",
    path: "/subscribe/create-survey",
    Icon: <FaRegStar size={17} />,
  },
  {
    gap: false,
    name: "Shipping Charges",
    path: "/subscribe/create-survey",
    Icon: <GrDeliver size={17} />,
  },

  {
    gap: false,
    name: "Subscriber",
    path: "/subscribe/create-survey",
    Icon: <IoMailOutline size={17} />,
  },
  {
    gap: false,
    name: "Customer List",
    path: "/subscribe/create-survey",
    Icon: <HiOutlineUsers size={17} />,
  },
  {
    gap: false,
    name: "Payment Gateway",
    path: "/subscribe/create-survey",
    Icon: <MdPayment size={17} />,
  },
];


const useActive = () => {
  const pathname = useRouter().pathname;

  const isActive = (path) => {
    return pathname.startsWith(`subscribe/quize/`) || pathname === path ? "_active" : "nav-link";
  };

  return { isActive };
};


const Sidebar = () => {
  const { isActive } = useActive();
  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        <Image height={70} width={200} src="/assets/img/logo/red-white.svg" alt="logo" />
      </div>

      <div className="py-1 " >
        <Menu theme="dark" style={{ backgroundColor: "transparent" }}>
          {
            list.map((x, index) => (
              <Menu.Item
                key={index}
                // ${isActive(x.path)}
                className={`${isActive(x.path)}`}
              // icon={
              //   <Link className="_link " href={x.path}>
              //     {x.Icon}
              //   </Link>
              // }
              >
                <div className="d-flex align-items-center gap-2">
                  {x.Icon}
                  <Link className="_link" href={x.path}>
                    {x.name}
                  </Link>
                </div>
              </Menu.Item>
            ))
          }
        </Menu>
      </div >

    </>
  )
}

export default Sidebar