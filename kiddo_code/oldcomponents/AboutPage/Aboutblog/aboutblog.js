import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Aboutblog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badge_color: "",
            badge_title: "",
            blog_title: "",
            blog_image_url: "",
            blog_image_name: "",
            blog_description: ""
        };
    }

    componentDidMount() {
        var query = `
                    query ActivityById($id: ID!){
                        pageBlogs(where:{id:$id}){
                            id,
                            badge_color,
                            badge_title,
                            blog_title,
                            blog_description,
                            blog_image{
                                name,
                                url
                            }
                        }
                    }
                    `;
        var variables = {
            "id": 1
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let blogDetail = response.data.pageBlogs[0];
                //console.log(blogDetail);
                this.setState({
                    badge_color: blogDetail.badge_color,
                    badge_title: blogDetail.badge_title,
                    blog_title: blogDetail.blog_title,
                    blog_image_url: blogDetail.blog_image.url,
                    blog_image_name: blogDetail.blog_image.name,
                    blog_description: blogDetail.blog_description,
                });
            });

        //console.log(homeBannerData);
    }
    render(){

        return (
            <>
                <section className=" about-mission-wrap">
                    <div className="container aos-init aos-animate" data-aos="fade-up">
                        <div className="row align-items-center justify-content-around">
                            <div className="col-md-5 col-xl-6 mb-4 mb-md-0 pl-6">
                                <img src={this.state.blog_image_url ? process.env.GRAPHIMAGEURL + this.state.blog_image_url : "/assets/images/inner-2.jpg"} className="rounded shadow-3d" />
                            </div>
                            <div className="col-md-7 col-xl-6">
                                <div className="row justify-content-center">
                                    <div className="col-xl-8 col-lg-10">
                                        <span className="badge badge-primary rounded-0">{this.state.badge_title}</span>
                                        <div className="my-3">
                                            <span className="h1">{this.state.blog_title}</span>
                                        </div>
                                        <p className="lead" dangerouslySetInnerHTML={{ __html: this.state.blog_description }} ></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}   

export default Aboutblog;
