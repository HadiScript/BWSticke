import { Col, Dropdown, Grid, Row, Tag } from "antd"
import Image from "next/image"
import Sidebar from "./Sidebar"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiProfileFill } from "react-icons/ri";
import { MdLogout,  } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { AiOutlineNotification } from "react-icons/ai";


const AdminHeader = () => {
  const { data: session } = useSession();
  const items = [
    {
      label: <Link href={'/profile'}>Profile</Link>,
      icon: <RiProfileFill size={17} />,
      key: '0',
    },
    {
      label: 'Sign Out',
      icon: <MdLogout size={17} />,
      key: '1',
      onClick: () => signOut({ callbackUrl: "/" })
    },
  ];


  return <div className="pb-2 pt-2 border-bottom bg-white rounded px-3 d-flex flex-row justify-content-between align-items-center ">
    <div ></div>
    <div className="d-flex gap-3">
      <Dropdown menu={{ items }} trigger={['click']}>
        <div role="button" className="d-flex align-items-center gap-2">
          <AiOutlineNotification size={17} />
          <span style={{ fontSize: "15px" }}>Notifications</span>
        </div>
      </Dropdown>
      <Link href={'/'} className="d-flex gap-1 align-items-center"> <CiGlobe size={16} /><span style={{ fontSize: "15px" }}>Visit App</span></Link>
      {session &&
        <div role={'button'}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <div className="d-flex align-items-center gap-2">
              <FaRegUser size={15} />
              <span style={{ fontSize: "15px" }}>{session?.user?.name}</span>
            </div>
          </Dropdown>
        </div>
      }
    </div>

  </div>
}

const AdminLayout = ({ children }) => {
  const points = Grid.useBreakpoint()
  return (
    <Row>


      <Col className="fixedColumn leftColumn border-end" lg={4} sm={0} >
        <Sidebar />
      </Col>

      <Col className="centerColumn" lg={20} sm={24}>
        <AdminHeader />


        <div className={`py-3  ${points?.lg ? "px-2" : ""} `}> {children}</div>
      </Col>

    </Row>
  )
}

export default AdminLayout