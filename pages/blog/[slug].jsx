import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import Link from "next/link";
import BlogSidebar from "~/components/UI/blogs/BlogSidebar";


const BlogDetails = () => {
  return (
    <ClientLayout>
      <div className="postbox-area pt-80 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="postbox__wrapper pr-20">
                <article className="postbox__item format-image mb-50 transition-3">
                  <div className="postbox__thumb w-img mb-30">
                    <img src="/assets/img/blog/blog-in-01.jpg" alt="" />
                  </div>
                  <div className="postbox__content">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="postbox__content postbox__content-area mb-55">
                          <div className="postbox__meta mb-15">
                            <span>
                              <i className="fal fa-clock" /> Dec 28, 2022
                            </span>

                          </div>
                          <h4 className="mb-35">Lavoratories used for scientic reseach take many froms.</h4>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, aperiam
                            ipsquae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                            voluptatem voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                          </p>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, aperiam
                            ipsquae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="postbox__content-area mb-60">
                          <h4>Our Approach</h4>
                          <div className="postbox__text mb-30">
                            <p>
                              Must explain to you how all praising uts pain was born and I will gives you a itself completed account of
                              the system, and sed expounds the ut actual teachings of that greater{" "}
                            </p>
                            <div className="postbox__text-list">
                              <ul>
                                <li>
                                  <i className="fal fa-check" />
                                  Extramural Funding
                                </li>
                                <li>
                                  <i className="fal fa-check" />
                                  Bacteria Markers
                                </li>
                                <li>
                                  <i className="fal fa-check" />
                                  Nam nec mi euismod euismod
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="postbox__meta-img w-img mb-60">
                          <img src="/assets/img/blog/blog-in-02.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="postbox__content-area mb-40">
                          <h4 className="mb-25">What Is A Business Technology Roadmap?</h4>
                          <p>
                            Unlike detailed blueprints that lay out all tasks, deadlines, bug reports, and more along the way, technology
                            roadmaps are high-level visual summaries highlighting a company’s vision or plans.
                          </p>
                          <p>
                            In an Agile approach, a technology roadmap feeds the sprint and grooming processes, providing insight into how
                            the product will travel from start to finish. It makes it easier for development teams to:
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="postbox__meta-img mb-60">
                          <img src="/assets/img/blog/blog-in-05.jpg" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="postbox__meta-img mb-60">
                          <img src="/assets/img/blog/blog-in-04.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="postbox__tag-border">
                      <div className="row align-items-center">
                        <div className="col-xl-7 col-md-12">
                          <div className="postbox__tag">
                            <div className="postbox__tag-list tagcloud">
                              <span>Tag</span>
                              <Link href="/blog">Furniture</Link>
                              <Link href="/blog">Table</Link>
                              <Link href="/blog">Fashion</Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-5 col-md-12">
                          <div className="postbox__social-tag">
                            <span>Share</span>
                            <Link className="blog-d-lnkd" href="#">
                              <i className="fab fa-linkedin-in" />
                            </Link>
                            <Link className="blog-d-pin" href="#">
                              <i className="fab fa-pinterest-p" />
                            </Link>
                            <Link className="blog-d-fb" href="#">
                              <i className="fab fa-facebook-f" />
                            </Link>
                            <Link className="blog-d-tweet" href="#">
                              <i className="fab fa-twitter" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>


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

export default BlogDetails