import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Review extends Component {
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
            "id": 3
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
                 <section className="review-section">
                    <div className="container">
                      <h2 className="mb-4">Review</h2>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="comment-sec">
                              <h5>Tony Stark</h5>
                              <div className="d-flex">
                                <div className="d-flex">
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                </div>
                                <h6 className="mb-0 opacity-80 font-weight-normal ml-2">a week ago</h6>
                              </div>
                              <p className="h6 h5 font-weight-normal mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nulla ipsum in quam in adipiscing leo risus, accumsan. Pharetra suscipit rhoncus nulla donec eros lobortis. Orci vulputate risus tortor fringilla malesuada maecenas. Turpis netus mauris massa nunc egestas.</p>
                              <h6 className="font-weight-normal opacity-60">Was this helpful?</h6>
                              <div className="d-flex align-items-center">
                                <div className="review-btn"><a href="#"><i className="fa fa-thumbs-up"></i></a></div>
                                <div className="review-btn"><a href="#"><i className="fa fa-thumbs-down"></i></a></div>
                                <h6 className="ml-2 mb-0 opacity-60">Report</h6>
                              </div>
                            </div>
                            <div className="comment-sec mt-4 pt-4 border-top">
                              <h5>Tony Stark</h5>
                              <div className="d-flex">
                                <div className="d-flex">
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                  <img src="/assets/images/Star.png" alt="star interface icon"/>
                                </div>
                                <h6 className="mb-0 opacity-80 font-weight-normal ml-2">a week ago</h6>
                              </div>
                              <p className="h6 h5 font-weight-normal mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nulla ipsum in quam in adipiscing leo risus, accumsan. Pharetra suscipit rhoncus nulla donec eros lobortis. Orci vulputate risus tortor fringilla malesuada maecenas. Turpis netus mauris massa nunc egestas.</p>
                              <h6 className="font-weight-normal opacity-60">Was this helpful?</h6>
                              <div className="d-flex align-items-center">
                                <div className="review-btn"><a href="#"><i className="fa fa-thumbs-up"></i></a></div>
                                <div className="review-btn"><a href="#"><i className="fa fa-thumbs-down"></i></a></div>
                                <h6 className="ml-2 mb-0 opacity-60">Report</h6>
                              </div>
                            </div>
                            <a href="#" className="mt-4 d-inline-block">Show more <span className="ml-1"><i className="fa fa-angle-down"></i></span></a>
                          </div>
                          <div className="col-md-6 text-light p-2 pb-5 pl-4">
                            <div className="p-5" style={{backgroundImage: `url(/assets/images/img21.jpg)`,  backgroundPosition: 'center' , backgroundRepeat: 'no-repeat'}}>
                              <h2>Ready to go long-term?</h2>
                              <h5 className="font-weight-light">Check out our degrees.</h5>
                              <a href="#" className="btn btn-lightblue text-light rounded-0 mt-0">Explore degree</a>
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

export default Review;