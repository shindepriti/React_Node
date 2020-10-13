import React, {Component} from 'react';
import Router from 'next/router';
import Layout from '../../components/Layout';
//import AboutPage from '../../components/AboutPage';
/*import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
  } from "react-share";*/
import {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
} from "react-share";

class Blogpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog_title: "",
            blog_description: ""
        };
    }
    componentDidMount(){
      
        let id = Router.query.id;
      
        var query = `
                    query ActivityById($blog_slug: ID!){
                        blogs(where:{blog_slug:$blog_slug}){
                            id,
                            blog_header,
                            blog_description,
                            blog_date,
                            blog_featured
                        }
                    }
                    `;
        var variables = {
            "blog_slug": id
        };

        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        })
        .then(response => response.json())
        .then((response) => {
            //console.log(response);
            let glanceData = [];
            if (response.data.blogs) {
                glanceData = response.data.blogs[0];

                console.log(glanceData); 
                this.setState({
                    blog_title: glanceData.blog_header,
                    blog_description: glanceData.blog_description
                });
            }
            
        });
    }
    render(){
        const { blog_title, blog_description } = this.state;
        return(
            <>
                <Layout>
                    <section></section>
                    <section className="pt-0 o-hidden single-page-wrap">
                        <div className="container">
                            <div class="align-items-center social-share-icons">
                                <span class="text-small mb-3 d-block text-uppercase mr-0">Share</span>
                                <div>
                                  <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                    <i class="fa fa-twitter"></i>

                                  </a>
                                  <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                    <i class="fa fa-facebook-official"></i>

                                  </a>
                                  <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                    <i class="fa fa-linkedin-square"></i>

                                  </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-7 col-lg-8">
                                        <h1 className="my-2 text-center">{blog_title}</h1>
                                        <div className="text-center">San Francisco, CA</div>
                                        <article className="article mt-5">
                                            <p className="lead" dangerouslySetInnerHTML={{ __html: blog_description }} ></p>
                                        </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            </>
        )
    }
}

export default Blogpost;