import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';

import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            product_hours: "",
            course_stat: "",
            product_introduction: "",
            product_type: "",
            product_testimonial : ''
        };
    }

    componentDidMount() {
        let id = Router.query.id;
        let splitData = id.split('-');
        var query = `
                    query ActivityById($id: ID!){
                        products(where:{id:$id}){
                            id,
                            product_name,
                            product_introduction,
                            product_hours,
                            product_type{
                              id,
                              product_type
                            },
                            course_stat{
                              id,
                              course_stat,
                            },
                            product_testimonials {
                              id,
                              ProductTestimonials {
                                id,
                                testimonial_description,
                                testimonial_full_name,
                                testimonial_founder_name,
                                 testimonial_image {
                                  url,
                                  name
                                },
                              }
                              
                            }
                        }
                    }
                    `;
        var variables = {
            "id": Number(splitData[0])
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        })
        .then(response => response.json())
        .then((response) => {
            // console.log(response);
            let productData = [];
            if (response.data.products) {
                productData = response.data.products[0];
                this.setState({
                    product_name: productData.product_name,
                    product_introduction: productData.product_introduction,
                    product_hours: productData.product_hours,
                    product_type: productData.product_type.product_type,
                    product_testimonial: productData.product_testimonials,
                });
            }
            
        });


        //console.log(homeBannerData);
    }
    render(){
              const { product_name, product_introduction, product_hours,product_type, product_testimonial } = this.state;
              // console.log(product_testimonial[0]);
        return (
            <>
               <section className="p-0 pt-3 intro-sec">
                <div className="container">
                  <div className="row frequently-wrap fascinates-section">
                    <div className="row col-xl-12">
                      <div className="col-md-8">
                        <h3 className="mb-1 frequently-bought-title">
                          <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS"/> Introduction to {product_name}
                          
                          <span className="badge badge-primary rounded-0 bg-none ml-2"><img className="mr-1" src="/assets/images/education-cap.svg"/>{product_type}</span>
                          <span className="badge badge-primary rounded-0"> {product_hours} Hours</span>
                        </h3>
                        
                      </div>
                      <div className="col-md-4">
                        <div className="price-desc align-center text-right">
                          <a href="#" className="btn btn-lightblue text-light rounded-0 ml-3 mobile-none">Apply now</a>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </section>
               <section className="display-dots o-hidden bestseller-sec ">
                <div className="container">
                  <div className="row justify-content-between o-visible">
                    <div className="col-md-6">
                      <h2 className="h1 w-75 mb-4">Introduction to {product_name}</h2>
                      <p className="h6 w-80 font-weight-normal h5 opacity-80">{product_introduction}</p>
                      {/*<div className="d-flex align-items-center flex-wrap">
                        <span className="new-tag bg-yellow-tag">Bestseller</span>
                        <span className="d-flex align-items-center">
                          <p className="text-dark font-weight-bold mb-0 mr-2">4.8</p>
                          <div className="d-flex">
                              <img src="/assets/images/Star.png" alt="star interface icon"/>
                              <img src="/assets/images/Star.png" alt="star interface icon"/>
                              <img src="/assets/images/Star.png" alt="star interface icon"/>
                              <img src="/assets/images/Star.png" alt="star interface icon"/>
                              <img src="/assets/images/Star.png" alt="star interface icon"/>
                            </div>
                        </span>
                        <span><h6 className="mb-0 opacity-80 font-weight-normal ml-2 mr-2">43,588 ratings</h6></span>
                        <span className="font-weight-bold">152,599 students</span>
                      </div>
                      <div className="avatar-author align-items-center mt-3">
                        <img src="/assets/images/image-1.jpg" alt="Avatar" className="avatar avatar-sm"/>
                        <div className="ml-2">
                          <span>Created by</span>
                          <span className="text-darkblue font-weight-bold ml-1">Kidocode</span>
                        </div>
                      </div>
                      <div className="d-block mt-3">
                        <a href="#" className="btn btn-border-wrap border-gray text-dark rounded-0">Share </a>
                        <a href="#" className="btn btn-primary rounded-0 ml-2">Apply now</a>
                      </div>*/}
                    </div>
                    <div className="col-lg-5 col-md-6" data-aos="fade-left">
                      <div className="decoration-wrapper">
                        <div className="decoration top left d-md-block" data-jarallax-element="-150 -150">
                            <img src="/assets/images/30.svg"/>
                        </div>
                      </div>
                      <div className="decoration-wrapper">
                        <div className="decoration bottom right d-md-block" data-jarallax-element="300 -250">
                            <img src="/assets/images/triagle-orange.svg"/>
                        </div>
                      </div>

                          {
                                  product_testimonial.length > 0 ? (
                                  <Flickity
                                      className={'carousel-cell'} // default ''
                                      elementType={'div'} // default 'div'
                                      options={flickityOptions} // takes flickity options {}
                                      disableImagesLoaded={false} // default false
                                      reloadOnUpdate={true} // default false
                                      static={false} // default false
                                  >
                                  
                                  {
                                     
                                          product_testimonial.map((product_testimonialData, index) => {
                                              return (
                                                   <div className="carousel-cell mx-3 p-2">
                                                      <div className="card card-body border-0 rounded-0 box-shadow-wrap">
                                                        <img src={product_testimonialData.ProductTestimonials ? process.env.GRAPHIMAGEURL + product_testimonialData.ProductTestimonials.testimonial_image.url : "/assets/images/img01.png"} alt="Avatar" className="avatar avatar-lg mb-2"/>
                                                        <div className="my-md-2 flex-grow-1">
                                                          <h4 className="font-weight-normal">
                                                              {product_testimonialData.ProductTestimonials.testimonial_description}
                                                          </h4>
                                                        </div>
                                                        <div className="avatar-author align-items-center">
                                                          <div>
                                                            <h6>{product_testimonialData.ProductTestimonials.testimonial_full_name}</h6>
                                                            <span>Designer</span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                              )
                                          })
                                      
                                  }
                               </Flickity>
                               ) : ''
                          }

                       
                    </div>
                  </div>
                </div>
              </section>
            </>
        )
    }
}

export default Introduction;