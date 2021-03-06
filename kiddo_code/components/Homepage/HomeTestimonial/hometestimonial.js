import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class HomeTestimonial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            image_url: "",
            description: "",
            founder: "",
        };
    }

    componentDidMount() {
        var query = `
                    query ActivityById($id: ID!){
                        mainTestimonials(where:{id:$id}){
                            id,
                            testimonial{
                                id,
                                testimonial_description,
                                testimonial_founder_name,
                                testimonial_full_name,
                                testimonial_image{
                                    name,
                                    url
                                }
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
                let homeTestimonialData = response.data.mainTestimonials[0];
                //console.log(homeBanner);
                let testimonialDetail = homeTestimonialData.testimonial[0];
                this.setState({
                    full_name: testimonialDetail.testimonial_full_name,
                    image_url: testimonialDetail.testimonial_image.url,
                    description: testimonialDetail.testimonial_description,
                    founder: testimonialDetail.testimonial_founder_name
                });
            });

        //console.log(homeBannerData);
    }
    render(){

        return (
            <>
                <section className="testimonial-wrap">
                    <div className="container">
                        <div className="row align-items-center justify-content-around">
                            <div className="col-md-7 col-xl-7">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-11">
                                        <div className="h1 font-weight-light">
                                            <q className="d-inline-block">
                                                {this.state.description}
                                            </q>
                                        </div>
                                        <div className="mb-2">{this.state.full_name + ', ' + this.state.founder}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 mb-md-0">
                                <div className="video-poster rounded mb-3">
                                    <div className="decoration-wrapper">
                                        <div className="decoration top left d-md-block" data-jarallax-element="0 -25">
                                            <img src="/assets/images/yellow-square-img.svg" />
                                        </div>
                                    </div>
                                    <a data-fancybox="" href="https://vimeo.com/421689971" className="btn btn-lg btn-primary btn-round">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon" data-src="http://54.255.146.92/wp-content/themes/kidocode/assets/img/icons/theme/media/play.svg" data-pagespeed-url-hash="4291238768">
                                            <title>Icon For Play</title>
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
                                                <path d="M9.82866499,18.2771971 L16.5693679,12.3976203 C16.7774696,12.2161036 16.7990211,11.9002555 16.6175044,11.6921539 C16.6029128,11.6754252 16.5872233,11.6596867 16.5705402,11.6450431 L9.82983723,5.72838979 C9.62230202,5.54622572 9.30638833,5.56679309 9.12422426,5.7743283 C9.04415337,5.86555116 9,5.98278612 9,6.10416552 L9,17.9003957 C9,18.1765381 9.22385763,18.4003957 9.5,18.4003957 C9.62084305,18.4003957 9.73759731,18.3566309 9.82866499,18.2771971 Z" fill="#000000"></path>
                                            </g>
                                        </svg> 
                                    </a>
                                    <img  src={this.state.image_url ? process.env.GRAPHIMAGEURL + this.state.image_url : "/assets/images/img01.png"} data-pagespeed-url-hash="3762136003" />
                                    {/* <div className="decoration-wrapper">
                                        <div className="decoration bottom right d-md-block" data-jarallax-element="50 50">
                                            <img src="/assets/images/green-shape.svg" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default HomeTestimonial;