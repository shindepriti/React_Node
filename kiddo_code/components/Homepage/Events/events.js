
import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

const fetch = require('isomorphic-fetch');

class Events extends Component {
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
                <section className="fascinates-section inside-arrow dark-blue-bg community-wrap upcoming-event-wrap p-6 o-hidden">
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
                                        <div className="arrows-inside flickity-enabled is-draggable" data-flickity='{ "groupCells": true, "autoPlay": false, "imagesLoaded": true, "wrapAround": true }' tabIndex="0">
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/event-ic1.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-3"><a href="#">JS</a></h4>
                                                        <div className="pd-0">

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

                                                            <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                            <a href="#" className="add-to-cart-btn">Add to Cart</a>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/event-ic2.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-4"><a href="#">Python</a></h4>
                                                        <div className="pd-0">
                                                            

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

                                                            <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/icon-javascript-original 1.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-3"><a href="#">JS</a></h4>

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

                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Vector1.svg" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-3"><a href="#">JS</a></h4>

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

                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div className="carousel-cell col-xl-3 col-lg-3 col-md-6 pb-1">
                                                <div className="carousel-cell">
                                                    <div className="card card-icon-2 card-body justify-content-between rounded-0 shadow-none">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg="" />
                                                        </div>
                                                        <h4 className="mb-3"><a href="#">JS</a></h4>

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

                                                        <p className="price"><strong>RM50.00<span className="price-tag"><span>RM40.00</span><span className="discount-tag">-20%</span></span></strong></p>
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
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>

                        <div className="decoration-wrapper">
                            <div className="decoration top middle-x d-none d-md-block" data-jarallax-element="100 100">
                            </div>
                        </div>

                    </div>
                </section>
            </>
        )
    }
}

export default Events;