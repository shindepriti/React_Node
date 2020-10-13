import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Apply extends Component {
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
                 <section className="footer-singup-wrap pt-6">
                  <div className="container">
                      <div className="row justify-content-center text-center align-items-center">
                          <div className="col-xl-5 col-lg-5 col-md-5">
                              <h3 className="h1 mb-5 font-weight-bold text-left">Apply for the trial class.</h3>
                              <form action="/apply-trial" method="POST" data-form-email novalidate>
                                  <div className="mb-3 justify-content-center text-left">
                                    <label className="font-weight-bold">Email address</label>
                                      <input type="email" name="email" className="mr-sm-1 mb-2 mb-sm-0 form-control form-control-lg" placeholder="john.doe@example.com" required/>
                                        <button type="submit" className="ml-sm-1 btn btn-lg btn-primary btn-loading" data-loading-text="Sending">
                                            <span>Get Started</span>
                                        </button>
                                  </div>
                              </form>

                              <div className="text-small text-left font-weight-normal">
                                  Learn more about how we use your information by reading our <strong>privacy policy</strong>.
                              </div>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-7">
                            <img src="/assets/images/22.svg"/>
                          </div>
                      </div>
                  </div>
              </section>
            </>
        )
    }
}

export default Apply;