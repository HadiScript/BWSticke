import Link from 'next/link'

const BlogSidebar = () => {
  return (
    <div className="sidebar__wrapper pl-25 pb-50">

      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title mb-25">Category</h3>
        <div className="sidebar__widget-content">
          <ul>
            <li>
              <Link href={`/blog/name`}>
                Chemistry<span>03</span>
              </Link>
            </li>
            <li>
              <Link href={`/blog/name`}>
                Forensic science <span>07</span>
              </Link>
            </li>
            <li>
              <Link href={`/blog/name`}>
                Gemological <span>09</span>
              </Link>
            </li>
            <li>
              <Link href={`/blog/name`}>
                COvid Analysis <span>01</span>
              </Link>
            </li>
            <li>
              <Link href={`/blog/name`}>
                Becteriology <span>00</span>
              </Link>
            </li>
            <li>
              <Link href={`/blog/name`}>
                Angiosperm <span>26</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar__widget mb-55">
        <h3 className="sidebar__widget-title mb-25">Recent Post</h3>
        <div className="sidebar__widget-content">
          <div className="sidebar__post rc__post">
            <div className="rc__post mb-20 d-flex align-items-center">
              <div className="rc__post-thumb">
                <Link href={`/blog/name`}>
                  <img src="/assets/img/blog/blog-in-01.jpg" alt="blog-sidebar" />
                </Link>
              </div>
              <div className="rc__post-content">
                <div className="rc__meta">
                  <span>4 March. 2022</span>
                </div>
                <h3 className="rc__post-title">
                  <Link href={`/blog/name`}>Do not Underestimate Tree for Furniture</Link>
                </h3>
              </div>
            </div>
            <div className="rc__post mb-20 d-flex align-items-center">
              <div className="rc__post-thumb">
                <Link href={`/blog/name`}>
                  <img src="/assets/img/blog/sidebar/blog-sm-2.jpg" alt="blog-sidebar" />
                </Link>
              </div>
              <div className="rc__post-content">
                <div className="rc__meta">
                  <span>12 February. 2022</span>
                </div>
                <h3 className="rc__post-title">
                  <Link href={`/blog/name`}>Equipping Researchers in the Developing World</Link>
                </h3>
              </div>
            </div>
            <div className="rc__post mb-20 d-flex align-items-center">
              <div className="rc__post-thumb">
                <Link href={`/blog/name`}>
                  <img src="/assets/img/blog/sidebar/blog-sm-3.jpg" alt="blog-sidebar" />
                </Link>
              </div>
              <div className="rc__post-content">
                <div className="rc__meta">
                  <span>14 January. 2022</span>
                </div>
                <h3 className="rc__post-title">
                  <Link href={`/blog/name`}>Things to do before shopping</Link>
                </h3>
              </div>
            </div>
            <div className="rc__post d-flex align-items-center">
              <div className="rc__post-thumb">
                <Link href={`/blog/name`}>
                  <img src="/assets/img/blog/sidebar/blog-sm-4.jpg" alt="blog-sidebar" />
                </Link>
              </div>
              <div className="rc__post-content">
                <div className="rc__meta">
                  <span>18 March. 2021</span>
                </div>
                <h3 className="rc__post-title">
                  <Link href={`/blog/name`}>Research And Verify of a Quality Product</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__widget mb-55">
        <h3 className="sidebar__widget-title mb-25">Popular Tag</h3>
        <div className="sidebar__widget-content">
          <div className="tagcloud">
            <Link href={`/blog/name`}>Furniture</Link>
            <Link href={`/blog/name`}>Table</Link>
            <Link href={`/blog/name`}>Chair</Link>
            <Link href={`/blog/name`}>Cloths</Link>
            <Link href={`/blog/name`}>Toy</Link>
            <Link href={`/blog/name`}>Suit</Link>
            <Link href={`/blog/name`}>T-Shirt </Link>
            <Link href={`/blog/name`}>Dress</Link>
            <Link href={`/blog/name`}>Wooden</Link>
            <Link href={`/blog/name`}>Clock</Link>
            <Link href={`/blog/name`}>Craft</Link>
            <Link href={`/blog/name`}>Gift</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar