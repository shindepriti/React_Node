
import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

const fetch = require('isomorphic-fetch');

class BundleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "",
        };
    }

    componentDidMount() {
        /*var query = `
                    query ActivityById($id: ID!){
                        headerTitles(where:{id:$id}){
                            id,
                            header_title
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
                let headerTitle = response.data.headerTitles[0];
                //console.log(homeBanner); 
                this.setState({
                    headerTitle: headerTitle.header_title
                });
            });

        //console.log(homeBannerData);*/
    }
    render(){

        return (
            <>          
                <section className="fascinates-section inside-arrow bg-purple-wrap community-wrap frequently-wrap p-6 o-hidden">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <h2 className="mx-xl-8"> Frequently bought together</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center z-index-9 frequently-slider">
                            <div className="col-xl-12 aos-init aos-animate">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">
                                        <div className="arrows-inside flickity-enabled is-draggable" data-flickity='{ "groupCells": true, "autoPlay": false, "imagesLoaded": true, "wrapAround": true }' tabIndex="0">
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Vector.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <div className="pd-0">
                                                            <span className="badge badge-primary rounded-0">degree</span>
                                                            <span className="badge badge-primary rounded-0 bg-none">20 Hours</span>
                                                            <h4 className="mb-4"><a href="#">JS</a></h4>
                                                            <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                            <a href="#" className="add-to-cart-btn">Add to Cart</a>
                                                        </div>
                                                        <div className="plus-icon">+</div>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 p-0">
                                                        <div className="icon-round mb-md-12 icon bg-primary width-100">
                                                            <img className="" src="/assets/images/img20.png" alt="Python" data-inject-svg="" />
                                                        </div>
                                                        <div className="pd-20">
                                                            <h4 className="mb-4"><a href="#">Python</a></h4>
                                                            <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                        </div>
                                                        <div className="plus-icon">+</div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-4"><a href="#">JS</a></h4>
                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                        <div className="plus-icon">+</div>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Vector1.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-4"><a href="#">JS</a></h4>
                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                        <div className="plus-icon">+</div>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-0"><a href="#">JS</a></h4>
                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                        <div className="plus-icon">+</div>
                                                    </div> 
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
                            <div className="row col-xl-12">
                                <div className="col-xl-7">
                                    <h2 className="mb-1 frequently-bought-title">Name of frequently bought bundle</h2>
                                    <h6 className="text-muted opacity-80">6 items in this bundle</h6>
                                </div>
                                <div className="col-xl-5">
                                    <div className="price-desc align-center">
                                        <h2 className="price d-inline-block align-middle mb-0">
                                            <strong>RM50.00
                                                <span className="price-tag">
                                                    <span>RM40.00</span>
                                                    <span className="discount-tag">-20%</span>
                                                </span>
                                            </strong>
                                        </h2>
                                        <a href="#" className="btn btn-lightblue text-light rounded-0 ml-3">Add all items to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="decoration-wrapper">
                            <div className="decoration top middle-x d-none d-md-block" data-jarallax-element="100 100">
                                <img src="/assets/images/21.svg" />
                            </div>
                        </div>

                    </div>
                </section>
            </>
        )
    }
}

export default BundleProduct;