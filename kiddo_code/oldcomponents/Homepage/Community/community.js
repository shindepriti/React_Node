
import React from 'react';

const Community = (props) => {

  return (
    <>
        <section className="fascinates-section inside-arrow">
            <div className="container">
                <div className="row justify-content-center text-center mb-6">
                    <div className="col-xl-8 col-lg-9">
                        <h2 className="display-4 mx-xl-8">Popular in the community</h2>
                    </div>
                </div>
                <div className="row justify-content-left mb-5">
                    <div className="col-xl-12 d-flex">
                        <ul className="nav justify-content-left" role="tablist">
                            <li className="nav-item mx-1">
                                <a className="nav-link active" href="#product-tab-1" data-toggle="tab" role="tab" aria-controls="product-tab-1" aria-selected="true">
                                    <div className="icon-round icon-round-sm bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className="injected-svg icon bg-primary" data-src="http://54.255.146.92/wp-content/uploads/2020/06/Sketch.svg"><path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M5.5 3H19.5L23.5 8H1.5L5.5 3Z" fill="#1C1C1E"></path><path fillRule="evenodd" clipRule="evenodd" d="M23.5 8L12.5 20L1.5 8H23.5Z" fill="#1C1C1E"></path></svg>
                                    </div>
                                    Programming
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link" href="#product-tab-2" data-toggle="tab" role="tab" aria-controls="product-tab-2" aria-selected="false">
                                    <div className="icon-round icon-round-sm bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="injected-svg icon bg-primary" data-src="http://54.255.146.92/wp-content/uploads/2020/06/Interselect.svg"><path opacity="0.3" d="M6 9V15C6 16.6569 7.34315 18 9 18H15V18.8182C15 20.2325 14.2325 21 12.8182 21H5.18182C3.76751 21 3 20.2325 3 18.8182V11.1818C3 9.76751 3.76751 9 5.18182 9H6ZM17 16V10C17 8.34315 15.6569 7 14 7H8V6.18182C8 4.76751 8.76751 4 10.1818 4H17.8182C19.2325 4 20 4.76751 20 6.18182V13.8182C20 15.2325 19.2325 16 17.8182 16H17Z" fill="#1C1C1E"></path><path fillRule="evenodd" clipRule="evenodd" d="M9.27273 9H13.7273C14.5523 9 15 9.44771 15 10.2727V14.7273C15 15.5523 14.5523 16 13.7273 16H9.27273C8.44771 16 8 15.5523 8 14.7273V10.2727C8 9.44771 8.44771 9 9.27273 9Z" fill="#1C1C1E"></path></svg>
                                    </div>
                                    Digital Marketting                            
                                </a>
                            </li>
                        </ul>
                        <a href="#" className="align-self-center sell-all-txt">See all <span className="hover-arrow" aria-hidden="true"></span></a>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">
                                <div className="arrows-inside mb-6 flickity-enabled is-draggable" data-flickity='{ "groupCells": true, "autoPlay": false, "imagesLoaded": true, "wrapAround": true }' tabIndex="0">
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Bezier curve.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Bucket.svg" alt="Python" data-inject-svg="" />
                                                </div>
                                                <span className="badge badge-primary rounded-0">degree</span>
                                                <span className="badge badge-primary rounded-0 bg-none">20 Hours</span>
                                                <h3 className="mb-0">Python</h3>
                                                <p>Lorem ipsum is dummy content.</p>
                                                <p className="price"><strong>RM10.00</strong></p>
                                            </a>
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Oval 2.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Apple-Watch.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="tab-pane fade" id="product-tab-2" role="tabpanel" aria-labelledby="product-tab-2">
                                <div className="arrows-inside mb-6 is-draggable" data-flickity='{ "autoPlay": false, "imagesLoaded": true, "wrapAround": true }' tabIndex="0">
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Bezier curve.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Bucket.svg" alt="Python" data-inject-svg="" />
                                                </div>
                                                <span className="badge badge-primary rounded-0">degree</span>
                                                <span className="badge badge-primary rounded-0 bg-none">20 Hours</span>
                                                <h3 className="mb-0">Python</h3>
                                                <p>Lorem ipsum is dummy content.</p>
                                                <p className="price"><strong>RM10.00</strong></p>
                                            </a>
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Oval 2.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="/assets/images/Apple-Watch.svg" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
                                        </div>
                                    </div> 
                                    <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                        <div className="carousel-cell">
                                            <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                    <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                </div>
                                                <h3 className="mb-0">JS</h3>
                                                <p className="price"><strong>RM50.00</strong></p>
                                            </a> 
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

export default Community;