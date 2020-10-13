import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

class Blogs extends Component {

    constructor(props){
        super(props);
        this.state = {
            featuredBlog: [],
            blogs: []
        };
    }

    componentDidMount(){
        this.getFeaturedBlogs();
        this.getUnfeaturedBlogs();
    }

    getUnfeaturedBlogs(){
        var query = `
                    query {
                        blogs(where:{blog_featured:false}){
                            id,
                            blog_header,
                            blog_description,
                            blog_date,
                            blog_featured,
                            blog_category{
                              category_name
                            },
                            blog_image{
                              name,
                                    url
                            },
                            author_image{
                              name,
                              url
                            },
                            blog_slug
                        }
                    }
                    `;
        
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let glanceData = [];
                if (response.data.blogs) {
                    glanceData = response.data.blogs;
                }
                //console.log(glanceData); 
                this.setState({
                    blogs:glanceData
                });
            });
    }

    getFeaturedBlogs(){
        var query = `
                    query {
                        blogs(where:{blog_featured:true}){
                            id,
                            blog_header,
                            blog_description,
                            blog_date,
                            blog_featured,
                            blog_category{
                              category_name
                            },
                            blog_image{
                              name,
                                    url
                            },
                            author_image{
                              name,
                              url
                            },
                            blog_slug
                        }
                    }
                    `;
        
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let glanceData = [];
                if (response.data.blogs) {
                    glanceData = response.data.blogs;
                }
                //console.log(glanceData); 
                this.setState({
                    featuredBlog:glanceData
                });
            });
    }

    render(){
        const { featuredBlog, blogs } = this.state;
        return(
            <>
                <section className="pt-7">
                    <div className="container pt-7">
                        <div className="row">
                            <div className="col-md-6 col-lg-8 featured-post mb-3">
                                <div data-flickity='{ "imagesLoaded": true, "wrapAround": true }' className="mb-5">
                                    {
                                        featuredBlog.length > 0 &&
                                        <Flickity
                                            className={'carousel-cell'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate={true} // default false
                                            static={false} // default false
                                        >
                                            {
                                                featuredBlog.length > 0 &&
                                                featuredBlog.map((featuredBlogDetail, index) => {
                                                    return (
                                                        <div key={"featured-"+index} className="carousel-cell mx-3">
                                                            <a href={"/blog/"+featuredBlogDetail.blog_slug} className="card card-body bg-dark justify-content-between text-light">
                                                                <img src="/assets/images/article-3.jpg" alt="Image" className="jarallax-img opacity-30" />
                                                                <div className="justify-content-between mb-3">
                                                                    <div className="text-small d-block avatars">
                                                                        <img src="/assets/images/female-4.jpg" alt="Avatar" className="avatar" />
                                                                        <h6 className="d-block mt-3">{featuredBlogDetail.blog_category.category_name}</h6>
                                                                        <h2>{featuredBlogDetail.blog_header}</h2>
                                                                    </div>
                                                                    <span className="badge bg-white text-dark rounded-pill ">
                                                                        <svg width="12" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.3616 13.7407L4.27722 15.888C3.78838 16.145 3.18375 15.957 2.92675 15.4682C2.82441 15.2735 2.7891 15.0505 2.82627 14.8338L3.60632 10.2858L0.301989 7.06483C-0.0934947 6.67933 -0.101587 6.04621 0.283914 5.65073C0.437423 5.49325 0.638565 5.39076 0.856202 5.35913L5.42268 4.69559L7.46487 0.557657C7.70929 0.0624036 8.30892 -0.140935 8.80417 0.103487C9.00138 0.200817 9.16101 0.360445 9.25834 0.557657L11.3005 4.69559L15.867 5.35913C16.4136 5.43855 16.7922 5.94599 16.7128 6.49254C16.6812 6.71018 16.5787 6.91132 16.4212 7.06483L13.1169 10.2858L13.8969 14.8338C13.9903 15.3781 13.6247 15.8951 13.0804 15.9884C12.8636 16.0256 12.6406 15.9903 12.446 15.888L8.3616 13.7407Z" fill="#000"/>
                                                                        </svg> featured
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-small opacity-70">a year ago . 2 min read</span>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Flickity>
                                    }
                                </div>
                            </div>    

                            <div className="col-md-6 col-lg-4 d-flex">
                                <div className="card">
                                    <a href="#">
                                        <img src="/assets/images/inner-5.jpg" alt="Image" className="card-img-top" />
                                    </a>
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between mb-1">
                                            <div className="text-small d-flex">
                                                <div className="mr-2">
                                                    <a href="#" className="text-dark">Business</a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="mb-3">
                                            <h4>How to build collateral</h4>
                                        </a>
                                        <div className="avatars blog-author-img">
                                            <img src="/assets/images/female-3.jpg" alt="Image" className="avatar avatar-sm" />
                                        </div>
                                        <span className="text-small opacity-70">a year ago . 2 min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                blogs.length > 0 &&
                                blogs.map((blogDetail, index) => {
                                    return (
                                        <div key={"blogDetail-"+index} className="col-md-6 col-lg-4 d-flex">
                                            <div className="card">
                                                <a href={"/blog/"+blogDetail.blog_slug}>
                                                    <img src={blogDetail.blog_image.url ? process.env.GRAPHIMAGEURL + blogDetail.blog_image.url : "/assets/images/inner-5.jpg"} alt="Image" className="card-img-top" />
                                                </a>
                                                <div className="card-body d-flex flex-column">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <div className="text-small d-flex">
                                                            <div className="mr-2">
                                                                <a href="#" className="text-dark">{blogDetail.blog_category.category_name}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="mb-3">
                                                        <h4>{blogDetail.blog_header}</h4>
                                                    </a>        
                                                    <div className="avatars blog-author-img">
                                                        <img src={blogDetail.author_image.url ? process.env.GRAPHIMAGEURL + blogDetail.author_image.url : "/assets/images/female-3.jpg"} alt="Image" className="avatar avatar-sm" />
                                                    </div>
                                                    <span className="text-small opacity-70">a year ago . 2 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
  
export default Blogs;