import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddressBooks from '~/components/ClientProfile/AddressBooks'
import ManagePassword from '~/components/ClientProfile/ManagePassword'
import ManageProfile from '~/components/ClientProfile/ManageProfile'
import PurchaseHistory from '~/components/ClientProfile/PurchaseHistory'
import RefundRequest from '~/components/ClientProfile/RefundRequest'
import ClientLayout from '~/components/UI/Layouts/ClientLayout'

const ClientsSidebar = ({ current, setCurrent }) => {
  return <div className="col-12 col-lg-2  p-2 border-end client-sidebar">
    <div className="d-flex flex-column gap-2">
      <div className={`${current === "profile" && "active"} `} role='button' onClick={() => setCurrent('profile')}> Manage Profile </div>
      <div className={`${current === "purchase" && "active"} `} role='button' onClick={() => setCurrent('purchase')}> Purchase History </div>
      <div className={`${current === "refund" && "active"} `} role='button' onClick={() => setCurrent('refund')}> Refund Request </div>
      <div className={`${current === "address" && "active"} `} role='button' onClick={() => setCurrent('address')}> Manage Address Book </div>
      <div className={`${current === "password" && "active"} `} role='button' onClick={() => setCurrent('password')}> Manage Password </div>
    </div>
  </div>
}

const Profile = () => {
  const [current, setCurrent] = useState("profile");

  const { session } = useSelector((state) => state.localSession);
  const router = useRouter();

  return (
    <ClientLayout from="client">
      <div className="container client-profile-layout py-5">
        <div className="row">
          <ClientsSidebar current={current} setCurrent={setCurrent} />
          <div className="col-12 col-lg-8  p-2">
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