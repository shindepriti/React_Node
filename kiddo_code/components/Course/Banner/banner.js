import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerdescription: "",
            bannerUrl: "",
            bannerName: "",
            bannerVideo: ""
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
                            },
                            banner_video{
                              id,
                              previewUrl,
                              url,
                              provider,
                              provider_metadata,
                              name
                            }
                        }
                    }
                    `;
        var variables = {
            "id": 7
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
                    bannerVideo: homeBanner.banner_video.url ? homeBanner.banner_video.url : '' 
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        const { bannerdescription, bannerUrl, bannerName, bannerVideo } = this.state;
        return (
            <>
                 <section className="bg-primary-3 text-light has-divider jarallax " data-jarallax="" data-speed="0.2">
                    <div className="container">
                          <div className="row justify-content-center text-center min-vh-50 align-items-center hero-banner">
                              <div className="col-xl-9 col-lg-9 col-md-10">
                                  <a data-fancybox="" href={bannerVideo ? process.env.GRAPHIMAGEURL + bannerVideo : ""} className="btn btn-xlg btn-primary btn-round mx-auto mb-4 aos-init aos-animate" data-aos="fade-up">
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="injected-svg icon" data-src="http://localhost/kidocode/wp-content/themes/kidocodeassets/img/icons/theme/media/play.svg">
                                          <title>Icon For Play</title>
                                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                              <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
                                              <path d="M9.82866499,18.2771971 L16.5693679,12.3976203 C16.7774696,12.2161036 16.7990211,11.9002555 16.6175044,11.6921539 C16.6029128,11.6754252 16.5872233,11.6596867 16.5705402,11.6450431 L9.82983723,5.72838979 C9.62230202,5.54622572 9.30638833,5.56679309 9.12422426,5.7743283 C9.04415337,5.86555116 9,5.98278612 9,6.10416552 L9,17.9003957 C9,18.1765381 9.22385763,18.4003957 9.5,18.4003957 C9.62084305,18.4003957 9.73759731,18.3566309 9.82866499,18.2771971 Z" fill="#000000"></path>
                                          </g>
                                      </svg>
                                  </a>
                                  <h4 className="display-4 mb-2">{bannerdescription ? bannerdescription : ''}</h4>
                              </div>
                          </div>
                      </div>
                      <div id="jarallax-container-1" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: '-100'}}>
                      
                    </div>
                    <div className="banner-image">
                        <img src={bannerUrl ? process.env.GRAPHIMAGEURL + bannerUrl : ""} alt={bannerName} className="jarallax-img opacity-50" />
                    </div>
                  </section>
            </>
        )
    }
}

export default Banner;