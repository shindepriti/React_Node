import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Flickity from 'react-flickity-component';
import Router from 'next/router';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsGet: {
                type: "",
                data: []
            }
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
                  product_sell_price
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
                let getProductDataFilter = response.data.products;

                let products = getProductDataFilter.filter((item) => {
                    if (item.product_type != null) {
                        return (item.product_type.product_type === 'Event') && (item.product_slug !== splitData[1] + '-' + splitData[2])
                    }
                })
                this.setState({
                    productsGet: {
                        type: 'Event',
                        data: products
                    }
                });
            });

        //console.log(homeBannerData);
    }
    render() {
        const { productsGet } = this.state;
        return (
            <>
                <section className="fascinates-section inside-arrow bg-xdark-blue community-wrap frequently-wrap pt-6 pb-6 o-hidden">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <h2 className="mx-xl-8 mb-5"> Frequently bought together</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center z-index-9 frequently-slider">
                            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">

                                        {
                                            productsGet.data.length > 0 ? (
                                                <Flickity
                                                    className={'carousel-cell'} // default ''
                                                    elementType={'div'} // default 'div'
                                                    options={flickityOptions} // takes flickity options {}
                                                    disableImagesLoaded={false} // default false
                                                    reloadOnUpdate={true} // default false
                                                    static={false} // default false
                                                >

                                                    {

                                                        productsGet.data.map((productsGets, index) => {
                                                            return (
                                                                <div key={index} className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                                    <div className="carousel-cell" >
                                                                        <div className="card card-icon-2 card-body justify-content-between rounded-0">
                                                                            <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                                <img className="" src=
                                                                                    {productsGets.product_media.url ? process.env.GRAPHIMAGEURL + productsGets.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg="" />
                                                                            </div>
                                                                            <h4 className="mb-0"><a href="#">{productsGets.product_name ? productsGets.product_name : ''}</a></h4>
                                                                            {/* <p className="price"><strong>RM{productsGets.product_sell_price ? productsGets.product_sell_price : ''}<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p> */}
                                                                            <div className="plus-icon">+</div>
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
                                    <div className="tab-pane fade" id="product-tab-2" role="tabpanel" aria-labelledby="product-tab-2">
                                        <Flickity
                                            className={'carousel-cell'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate={true} // default false
                                            static={true} // default false
                                        >
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
                                        </Flickity>
                                    </div>

                                </div>
                            </div>
                            <div className="row col-xl-12">
                                <div className="col-xl-7">
                                    <h2 className="mb-1 frequently-bought-title h3">Web devloper super bundle</h2>
                                    <h6 className="text-muted opacity-80">{productsGet.data ? productsGet.data.length : ''} items in this bundle</h6>
                                </div>
                                {/* <div className="col-xl-5">
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
                                </div> */}
                            </div>
                        </div>

                        <div className="decoration-wrapper">
                            <div className="decoration top middle-x d-md-block" data-jarallax-element="100 100">
                                <img src="/assets/images/21.svg" />
                            </div>
                        </div>

                    </div>
                </section>
            </>
        )
    }
}

export default Review;