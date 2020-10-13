import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Mapaddress extends Component {
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
                <React.Fragment>
                    <section>
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-sm-4 mb-3 mb-sm-0">
                                    <h3 className="h2">Visit</h3>
                                    <span className="lead">
                                        389 Greenpoint Ave
                                        <br />Crown Heights, Brooklyn
                                        <br />New York
                                    </span>
                                </div>
                                <div className="col-sm-4 mb-3 mb-sm-0">
                                    <h3 className="h2">Email</h3>
                                    <a href="#" className="lead text-blue">hello@company.io</a>
                                </div>
                                <div className="col-sm-4 mb-3 mb-sm-0">
                                    <h3 className="h2">Call</h3>
                                    <span className="lead">+61 4728 3928</span>
                                    <div className="text-small text-muted">Mon - Fri, 9am - 5pm</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="p-0">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="min-vh-50 w-100 rounded shadow-3d o-hidden" data-marker-image="assets/img/map-marker-2.svg" data-maps-api-key="INSERT_YOUR_GOOGLE_MAPS_API_KEY_HERE" data-address="389 Greenpoint Ave, Crown Heights, Brooklyn New York" data-map-zoom="14">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d461914.37834658794!2d-74.16900360316184!3d40.485263446795315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s389%20Greenpoint%20Ave%2C%20Crown%20Heights%2C%20Brooklyn%20New%20York!5e0!3m2!1sen!2sin!4v1592378079447!5m2!1sen!2sin" width="100%" height="450" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            </>
        )
    }
}

export default Mapaddress;