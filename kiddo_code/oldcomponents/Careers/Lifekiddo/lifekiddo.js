
import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    pageDots: true,
    wrapAround: true
}
const fetch = require('isomorphic-fetch');

class Lifekiddo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            life_kiddo_title: "",
            life_kiddo_description: "",
            life_kiddo_images: []
        };
    }

    componentDidMount() {
        var query = `
                    query {
                        lifeAtKiddocodes{
                            id,
                            life_header_title,
                            life_kiddo_description,
                            life_images{
                              name,
                              url
                            }
                        }
                    }
                    `;
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let glanceData = response.data.lifeAtKiddocodes[0];
                //console.log(glanceData); 
                this.setState({
                    life_kiddo_title: glanceData.life_header_title,
                    life_kiddo_description: glanceData.life_kiddo_description,
                    life_kiddo_images: glanceData.life_images
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        const { life_kiddo_title, life_kiddo_description, life_kiddo_images } = this.state;
        return (
            <>
                <section className="bg-primary-alt display-dots careers-wrap">
                    <div className="container">
                        <div className="row justify-content-center mb-4">
                            <div className="col-lg-10 col-xl-8 text-center">
                                <h2 className="h1 font-weight-medium">{life_kiddo_title ? life_kiddo_title : ""} </h2>
                                <p className="lead">{life_kiddo_description ? life_kiddo_description : ""}</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-xl-8">
                                <div className="mb-5">
                                    {
                                        life_kiddo_images.length > 0 &&
                                        <Flickity
                                            className={'carousel-cell'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            reloadOnUpdate={true} // default false
                                            static={false} // default false
                                        >
                                            {
                                                life_kiddo_images.length > 0 &&
                                                life_kiddo_images.map((images, index) => {
                                                    return (
                                                        <React.Fragment key={"image_"+index}>
                                                            <div className="carousel-cell mx-3 ">
                                                                <img src={process.env.GRAPHIMAGEURL + images.url} alt="Image" className="rounded" />
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </Flickity>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Lifekiddo;