import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Flickity from 'react-flickity-component';
import Router from 'next/router';
const moment = require('moment');

const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
class UpcomingEventHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsGet: []
        };
    }

    componentDidMount() {
       
        var query = `
                    query {
                        products{
                            id,
                            product_name,
                            product_introduction,
                            product_hours,
                            product_type{
                              id,
                              product_type
                            },
                            product_date,
                            product_start_time,
                            product_end_time,
                            product_total_seats,
                            product_remain_seats,
                            product_event_map,
                            product_slug
                            product_media{
                                url,
                                name
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
                let getProductDataFilter = response.data.products;
                let products = getProductDataFilter.filter((item) => {
                    if (item.product_type != null) {
                        var currentTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                        var eventTime = item.product_date + ' ' + item.product_start_time;
                        eventTime = moment(eventTime).format('YYYY-MM-DD hh:mm:ss');
                        return (item.product_type.product_type === 'Event') && (currentTime < eventTime)
                    }
                })
                this.setState({
                    productsGet: products
                });
            });

        //console.log(homeBannerData);
    }
    render() {
        const { productsGet } = this.state;
        return (
            <>
                <section className="fascinates-section inside-arrow dark-blue-bg community-wrap upcoming-event-wrap p-6 o-hidden">
                    <div className="decoration-wrapper">
                        <div className="decoration top right d-md-block" data-jarallax-element="0 150">
                            <img src="/assets/images/orange-squre.svg" />
                        </div>
                    </div>
                    <div className="decoration-wrapper">
                        <div className="decoration bottom left d-md-block" data-jarallax-element="0 0">
                            <img src="/assets/images/blue-circle.svg" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12">
                                <h2 className="mx-xl-8 h1 text-center mb-3">Upcoming events</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center z-index-9 upcoming-event-slider">
                            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">
                                        {
                                            productsGet.length > 0 ? (
                                                <Flickity
                                                    className={'carousel-cell'} // default ''
                                                    elementType={'div'} // default 'div'
                                                    options={flickityOptions} // takes flickity options {}
                                                    disableImagesLoaded={false} // default false
                                                    reloadOnUpdate={true} // default false
                                                    static={true} // default false
                                                >
                                                    {
                                                        productsGet.map((event, index) => {
                                                            return (
                                                                <div key={index} className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                                    <div className="carousel-cell">
                                                                        <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                                            <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                                <img className="" src=
                                                                                    {event.product_media.url ? process.env.GRAPHIMAGEURL + event.product_media.url : "/assets/images/event-ic1.svg"} alt="JS" data-inject-svg="" />
                                                                            </div>
                                                                            <h4 className="mb-3"><a href="#">{event.product_name ? event.product_name : '-'}</a></h4>
                                                                            <div className="pd-0">

                                                                                <div className="event-details-main">
                                                                                    <div className="col-6 event-details">
                                                                                        <h6>Date</h6>
                                                                                        <h2>{event.product_date ? moment(event.product_date).format("DD") : '-'} <span>{event.product_date ? moment(event.product_date).format("MMM") : '-'}</span></h2>
                                                                                    </div>
                                                                                    <div className="col-6 event-details">
                                                                                        <h6>Starts at</h6>
                                                                                        <h2>{event.product_start_time ? moment(event.product_start_time, 'hh:mm:ss').format("h") : '-'} <span>{event.product_start_time ? moment(event.product_start_time, 'hh:mm:ss').format("A") : '-'}</span></h2>
                                                                                    </div>
                                                                                    <div className="col-6 event-details">
                                                                                        <h6>Seats left</h6>
                                                                                        <h2>{event.product_remain_seats ? event.product_remain_seats : '-'}<span> /{event.product_total_seats ? event.product_total_seats : '-'}</span></h2>
                                                                                    </div>
                                                                                    <div className="col-6 event-details">
                                                                                        <h6>Ends at</h6>
                                                                                        <h2>{event.product_end_time ? moment(event.product_end_time, 'hh:mm:ss').format("h") : '-'} <span>{event.product_end_time ? moment(event.product_end_time, 'hh:mm:ss').format("A") : '-'}</span></h2>
                                                                                    </div>
                                                                                </div>

                                                                                {/* <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p> */}
                                                                                {/* <a href="#" className="add-to-cart-btn">Add to Cart</a> */}
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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">Python</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

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
                                                        <h3 className="mb-3">JS</h3>

                                                        <div className="event-details-main">
                                                            <div className="col-6 event-details">
                                                                <h6>Date</h6>
                                                                <h2>15 <span>Oct</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Starts at</h6>
                                                                <h2>12 <span>PM</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Seats left</h6>
                                                                <h2>250<span> /300</span></h2>
                                                            </div>
                                                            <div className="col-6 event-details">
                                                                <h6>Ends at</h6>
                                                                <h2>3 <span>PM</span></h2>
                                                            </div>
                                                        </div>

                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a>
                                                </div>
                                            </div>
                                        </Flickity>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="decoration-wrapper">
                            <div className="decoration top middle-x d-none d-md-block" data-jarallax-element="100 100">
                                {/* <!-- <img src="/assets/images/21.svg"> --> */}
                            </div>
                        </div>

                    </div>
                </section>
            </>
        )
    }
}

export default UpcomingEventHome;