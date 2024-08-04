import Link from "next/link"
import BlogPost from "~/components/UI/blogs/BlogPost"
import BlogSidebar from "~/components/UI/blogs/BlogSidebar"
import ClientLayout from "~/components/UI/Layouts/ClientLayout"


const Blogs = () => {
  return (
    <ClientLayout>
      <div className="postbox-area pt-80 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="postbox pr-20 pb-50">
                <BlogPost showItem={6} style={1} showPagination />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Blogs