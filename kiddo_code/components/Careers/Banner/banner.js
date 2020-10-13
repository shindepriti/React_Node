
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careerbannerdescription: ""
        };
    }

    componentDidMount() {
        var query = `
                    query ActivityById($id: ID!){
                        homeBanners(where:{id:$id}){
                            id
                            description
                            header_file_type,
                            home_banner{
                              id,
                              previewUrl,
                              url,
                              provider,
                              provider_metadata,
                              name,
                            }
                        }
                    }
                    `;
        var variables = {
            "id": 4
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let homeBanner = response.data.homeBanners[0];
                //console.log(homeBanner.description); 
                this.setState({
                    careerbannerdescription: homeBanner.description
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        return (
            <>
                <section className="bg-dark-blue text-light header-inner p-0 jarallax position-relative pt-7 o-hidden explore-img-sec" data-jarallax="" data-speed="0.2" data-overlay="">
                  <div className="decoration-wrapper">
                    <div className="decoration top right d-none d-md-block" data-jarallax-element="90 100">
                        <img src="assets/images/24.svg"/>
                    </div>
                    <div className="decoration top right desktop-none" data-jarallax-element="70 0">
                        <img src="assets/images/24.svg"/>
                    </div>
                  </div>
                  <div className="decoration-wrapper">
                    <div className="decoration bottom right d-none d-md-block" data-jarallax-element="0 0" >
                        <img src="assets/images/bg-shape1.svg"/>
                    </div>
                    <div className="decoration bottom right bottom desktop-none" data-jarallax-element="100 0" >
                        <img src="assets/images/bg-shape1.svg"/>
                    </div>
                  </div>
                  <div className="decoration-wrapper">
                    <div className="decoration top left d-none d-md-block" data-jarallax-element="0 0">
                        <img src="assets/images/bg-shape2.svg"/>
                    </div>
                    <div className="decoration top left desktop-none" data-jarallax-element="70 0">
                        <img src="assets/images/bg-shape2.svg"/>
                    </div>
                  </div>
                  <div className="decoration-wrapper">
                    <div className="decoration bottom left d-none d-md-block" data-jarallax-element="0 2500">
                        <img src="assets/images/bg-shape3.svg"/>
                    <div id="jarallax-container-7" style={{position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", zIndex: "-100"}}><div style={{position: "fixed"}}></div></div></div>
                    <div className="decoration bottom middle-y desktop-none left" data-jarallax-element="0 -500" style={{width: "40%", zIndex:"-1 !important", transform: "translate3d(-500px, 0px, 0px)"}} data-jarallax-original-styles={{width: "40%",zIndex: "-1 !important"}}>
                        <img src="assets/images/bg-shape3.svg"/>
                    </div>
                  </div>
                  <div className="container py-0 pt-3 pb-3 text-center">
                    <div className="row my-2 my-md-5" data-aos="fade-up">
                      <div className="col-lg-9 col-xl-9 m-auto">
                        <h1 className="display-4"> Our careers</h1>
                        <h3 className="font-weight-light mobile-none">Whether you're trying to start a new career, build your side project, or simply play around with programming, you've found the right place to start.</h3>
                      </div>
                    </div>
                  </div>
                </section>
            </>
        )
    }
}
export default Banner;