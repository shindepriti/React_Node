import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsGet: {
        type: "",
        data: []
      },
      curriculams: [],
      allProducts: []
    };
  }

  componentDidMount() {
    let id = Router.query.id;
    let splitData = id.split('-');
    var query = `
                      query {
                          products{
                            id,
                            product_name,
                            product_introduction,
                            product_hours,
                            product_slug,
                            product_type{
                              id,
                              product_type
                            },
                            product_topic {
                              id,
                              product_topic_name
                            },
                            product_media{
                              url,
                              name
                            },
                            product_sell_price,
                            lesson{
                              id,
                              lesson_title,
                              lesson_text
                            },
                            product_curriculam{
                              id,
                              curriculam_title
                            }
                          },
                          curriculams{
                            id,
                            curriculam_title
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
        console.log('currrrr>>>', response)
        let getProductDataFilter = response.data.products;
        let getCurriculams = response.data.curriculams;
        let products = getProductDataFilter.filter((item) => {
          if (item.product_type != null) {
            return (item.product_curriculam.curriculam_title === getCurriculams[0].curriculam_title) && (item.product_slug !== splitData[1] + '-' + splitData[2])
            // && (item.product_slug !== splitData[1] + '-' + splitData[2])
          }
        })
        this.setState({
          productsGet: {
            type: 'Degree',
            data: products
          },
          curriculams: getCurriculams,
          allProducts: getProductDataFilter,
        });
      });

    //console.log(homeBannerData);
  }

  getProductData = (curriculam_title, index) => {
    let id = Router.query.id;
    let splitData = id.split('-');
    let allProducts = this.state.allProducts;
    this.setState({
      productsGet: {
        type: 'Degree',
        data: (allProducts && allProducts.length) ? allProducts.filter((item) => {
          if (item.product_type != null) {
            return (item.product_curriculam.curriculam_title === curriculam_title) && (item.product_slug !== splitData[1] + '-' + splitData[2])
          }
        }) : [],
      }
    })
  }
  render() {
    const { productsGet, curriculams } = this.state;
    return (
      <>
        <section className="fascinates-section learn-section curriculum-sec pb-1">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-xl-8 col-lg-9">
                <h2 className="mx-xl-6 font-weight-bold">Curriculum </h2>
              </div>
            </div>
            <div className="row justify-content-left mb-5 cat-listing-row w-80 mx-auto mobile-none">
              <div className="col-xl-12 d-flex cat-listing">
                <div className="cat-title">
                  <h5>Learning Paths </h5>
                </div>
                <ul className="nav justify-content-left" role="tablist">
                  {
                    curriculams.length > 0 &&
                    curriculams.map((curriculam, index) => {
                      return (
                        <li key={index} className="nav-item mx-1" onClick={() => { this.getProductData(curriculam.curriculam_title, index) }}>
                          <a className={index == 0 ? "nav-link active" : "nav-link"} href="#android" data-toggle="tab" role="tab" aria-controls="android" aria-selected="true">
                            {curriculam.curriculam_title}
                          </a>
                        </li>
                      )
                    })
                  }
                  {/* <li className="nav-item mx-1">
                    <a className="nav-link active" href="#android" data-toggle="tab" role="tab" aria-controls="android" aria-selected="true">
                      Android
                      </a>
                  </li>
                  <li className="nav-item mx-1">
                    <a className="nav-link" href="#ios" data-toggle="tab" role="tab" aria-controls="ios" aria-selected="false">
                      iOS
                        </a>
                  </li>
                  <li className="nav-item mx-1">
                    <a className="nav-link" href="#game" data-toggle="tab" role="tab" aria-controls="game" aria-selected="false">
                      Game
                        </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="tab-content w-80 mx-auto mobile-none">
              <div className="tab-pane fade show active" id="android" role="tabpanel" aria-labelledby="android">
                {
                  productsGet.data.length > 0 &&
                  productsGet.data.map((productsGets, index) => {
                    return (
                      <div key={"clm_"+index} className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <span className="badge badge-primary rounded-0">{productsGets.product_hours} HOURS</span>
                                <div className="z-index-99">
                                  <h3 className="mb-4 h4">{productsGets.product_name}</h3>
                                  {/* <p className="price"><strong>RM{productsGets.product_sell_price}<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p> */}
                                  {/* <a href="#" className="add-to-cart-btn">Add to Cart</a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>{productsGets.product_name}</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">{productsGets.product_introduction}</p>
                          <ul className="list-unstyled mb-0">

                            {
                              productsGets.lesson.length > 0 &&
                              productsGets.lesson.map((item, index) => {
                                return (
                                  <li key={"clms_"+index} className="d-flex py-2">
                                    <div className="icon-round icon-round-xs bg-dark mr-2">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                      </svg>
                                    </div>
                                    <span>
                                      <span className="font-weight-bold">{item.lesson_title}:</span>{item.lesson_text}</span>
                                  </li>)
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="tab-pane fade" id="ios" role="tabpanel" aria-labelledby="ios">
              </div>
              <div className="tab-pane fade" id="game" role="tabpanel" aria-labelledby="game">
              </div>
            </div>
            <div className="col-md-7 pr-6 desktop-none">
              <div className="border-bottom pb-2 mb-2 w-100">
                <div data-target="#panel-3" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="true">
                  <span className="h5 mb-1 w-100 text-dark">Android  <i className="fa fa-angle-down"></i></span>
                </div>
                <div className="collapse show" id="panel-3">
                  <div className="pt-2">
                    <div className="tab-pane fade show active" id="android" role="tabpanel" aria-labelledby="android">
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-bottom pb-2 mb-2 w-100">
                <div data-target="#panel-4" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="false">
                  <span className="h5 mb-1 w-100 text-dark">IOS <i className="fa fa-angle-down"></i></span>
                </div>
                <div className="collapse" id="panel-4">
                  <div className="pt-2">
                    <div className="tab-pane fade show active" id="ios" role="tabpanel" aria-labelledby="ios">
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-2 w-100">
                <div data-target="#panel-5" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="false">
                  <span className="h5 mb-1 w-100 text-dark">Game <i className="fa fa-angle-down"></i></span>
                </div>
                <div className="collapse" id="panel-5">
                  <div className="pt-2">
                    <div className="tab-pane fade show active" id="game" role="tabpanel" aria-labelledby="game">
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row justify-content-between align-items-center my-6">
                        <div className="col-md-5 col-lg-5 mb-4 mb-md-0 pr-5" data-aos="fade-right">
                          <div className="row justify-content-left">
                            <div className="col-xl-9 col-lg-10">
                              <div className="card card-icon-1 card-body justify-content-between shadow-3d rotate-left">

                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pl-3 pt-3">
                                  <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                </div>
                                <h3 className="mb-4 h4">Introduction to Javascript</h3>
                                <span className="badge badge-primary rounded-0">20 HOURS</span>
                                <div className="z-index-99">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6" data-aos="fade">
                          <h3>Introduction to Computer Science</h3>
                          <p className="h6 mb-3 h5 font-weight-normal">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</p>
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 1:</span>Natus error sit voluptatem</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 2:</span>Totam rem aperiam, eaque ipsa.</span>
                            </li>
                            <li className="d-flex py-2">
                              <div className="icon-round icon-round-xs bg-dark mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon bg-primary" data-src="assets/img/icons/interface/check.svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <path d="M18.1206 5.4111C18.5021 4.92016 19.1753 4.86046 19.6241 5.27776C20.073 5.69506 20.1276 6.43133 19.746 6.92227L10.6794 18.5889C10.2919 19.0876 9.60523 19.1401 9.15801 18.7053L4.35802 14.0386C3.91772 13.6106 3.87806 12.8732 4.26944 12.3916C4.66082 11.91 5.33503 11.8666 5.77533 12.2947L9.76023 16.1689L18.1206 5.4111Z" fill="#ffffff"></path>
                                </svg>
                              </div>
                              <span>
                                <span className="font-weight-bold">Lesson 3:</span>Accusantium doloremque laudantium, totam rem</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
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

export default Content;