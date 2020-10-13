import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerdescription: "",
            bannerUrl: "",
            bannerName: ""
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
            "id": 2
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
                //console.log(homeBanner); 
                this.setState({
                    bannerdescription: homeBanner.description,
                    bannerUrl: homeBanner.home_banner.url,
                    bannerName: homeBanner.home_banner.name,
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        return (
            <>
                 <section className="bg-dark-blue text-light header-inner p-0 jarallax position-relative pt-7 o-hidden explore-img-sec" data-jarallax data-speed="0.2" data-overlay>
                  <div className="decoration-wrapper">
                    <div className="decoration top right d-none d-md-block" data-jarallax-element="90 100">
                        <img src="assets/images/24.svg"/>
                    </div>
                    <div className="decoration top right desktop-none" data-jarallax-element="70 0">
                        <img src="assets/images/24.svg"/>
                    </div>
                  </div>
                  <div className="decoration-wrapper">
                    <div className="decoration bottom right d-none d-md-block" data-jarallax-element="0 0">
                        <img src="assets/images/bg-shape1.svg"/>
                    </div>
                    <div className="decoration bottom right bottom desktop-none" data-jarallax-element="100 0" style={{width: "40%", zIndex: "-1 !important"}}>
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
                    </div>
                    <div className="decoration bottom middle-y desktop-none left" data-jarallax-element="0 -500" style={{width: "40%",zIndex: "-1 !important"}}>
                        <img src="assets/images/bg-shape3.svg"/>
                    </div>
                  </div>
                  <div className="container py-0 pt-3 pb-3 text-center">
                    <div className="row my-2 my-md-5" data-aos="fade-up">
                      <div className="col-lg-9 col-xl-9 m-auto">
                        <h1 className="display-4"> Get in touch </h1>
                        <h3 className="font-weight-light mobile-none">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.</h3>
                      </div>
                    </div>
                  </div>
                </section>
            </>
        )
    }
}

export default Banner;