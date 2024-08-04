import { Dropdown } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddressBooks from '~/components/ClientProfile/AddressBooks'
import ManagePassword from '~/components/ClientProfile/ManagePassword'
import ManageProfile from '~/components/ClientProfile/ManageProfile'
import PurchaseHistory from '~/components/ClientProfile/PurchaseHistory'
import RefundRequest from '~/components/ClientProfile/RefundRequest'
import ClientLayout from '~/components/UI/Layouts/ClientLayout'

import { FaHistory } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { RiRefund2Fill } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";





const ClientsSidebar = ({ current, setCurrent }) => {
  const { data: session } = useSession();
  const handleButtonClick = (e) => {
    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const items = [
    {
      label: 'profile',
      key: '1',
      icon: <TiBusinessCard size={17} />,
      onClick: () => setCurrent('profile')
    },
    {
      label: 'purchase',
      key: '2',
      icon: <FaHistory size={17} />,
      onClick: () => setCurrent('purchase')
    },
    {
      label: 'refund',
      key: '3',
      icon: <RiRefund2Fill size={17} />,
      onClick: () => setCurrent('refund')

    },
    {
      label: 'address',
      key: '4',
      icon: <TbAddressBook size={17} />,
      onClick: () => setCurrent('address')

    },
    {
      label: 'password',
      key: '5',
      icon: <MdOutlinePassword size={17} />,
      onClick: () => setCurrent('password')


    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return <>
    <div className="d-none d-md-block col-12 col-lg-2  p-2 border-end client-sidebar">
      <div className="d-flex flex-column gap-2">
        <span className={`d-flex gap-2 align-items-center ${current === "profile" && "active"} `} role='button' onClick={() => setCurrent('profile')}>  <TiBusinessCard size={20} /> <span>Manage Profile</span> </span>
        <span className={`d-flex gap-2 align-items-center ${current === "purchase" && "active"} `} role='button' onClick={() => setCurrent('purchase')}>  <FaHistory size={20} /> <span>Purchase History</span>   </span>
        <span className={`d-flex gap-2 align-items-center ${current === "refund" && "active"} `} role='button' onClick={() => setCurrent('refund')}>  <RiRefund2Fill size={20} /> <span>Refund Request</span> </span>
        <span className={`d-flex gap-2 align-items-center ${current === "address" && "active"} `} role='button' onClick={() => setCurrent('address')}> <TbAddressBook size={20} /> <span>Manage Address</span> Book </span>
        <span className={`d-flex gap-2 align-items-center ${current === "password" && "active"} `} role='button' onClick={() => setCurrent('password')}> <MdOutlinePassword size={20} /> <span>Manage Password</span> </span>
        {session && (session.user.a || session.user.s.status) &&
          <Link href={'/dashboard'} role='button' > Dashboard </Link>
        }
      </div>
    </div>

    <div className="d-block d-md-none text-end mb-5" >
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        Menus
      </Dropdown.Button>
    </div>
  </>
}

const Profile = () => {
  const [current, setCurrent] = useState("profile");

  const { session } = useSelector((state) => state.localSession);
  const router = useRouter();

  return (
    <ClientLayout from="client">
      <div className="container client-profile-layout py-5" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center" >
          <ClientsSidebar current={current} setCurrent={setCurrent} />
          <div className="col-12 col-lg-8 mx-5 p-2 ">
            {current === 'profile' && <ManageProfile id={session && session.user.id} />}
            {current === 'password' && <ManagePassword id={session && session.user.id} />}
            {current === 'refund' && <RefundRequest id={session && session.user.id} />}
            {current === 'address' && <AddressBooks id={session && session.user.id} />}
            {current === 'purchase' && <PurchaseHistory id={session && session.user.id} />}
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Profile