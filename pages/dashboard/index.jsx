import { useState } from "react";
import AdminLayout from "~/components/Admin/AdminLayout";
import PageLoader from "~/utils/PageLoader";

const Dashboard = () => {
  const [data, setData] = useState({});


  return (
    <PageLoader url={`/api/dashboard`} setData={setData} ref={null}>

      <AdminLayout>Content</AdminLayout>


    </PageLoader>
  )
}


Dashboard.requireAuthAdmin = true;
Dashboard.dashboard = true;

export default Dashboard