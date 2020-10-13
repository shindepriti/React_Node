import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

const fetch = require('isomorphic-fetch');

class Showcase extends Component {
     constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            showcaseData: []
        };
    }

    componentDidMount() {
        var query = `
            query {
                 homeShowcases{
                        id,
                        showcase_title,
                        showcase_image{
                          name,
                          url
                        },
                        showcase_description
                    }
            }`;
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
                // console.log(response);
                let finalResponse = response.data.homeShowcases;
                this.setState({
                    originalData: finalResponse
                });
            });

        
    }
    // getShowcasesData = (index) => {
    //     let originalData = this.state.originalData;

    //     this.setState({
    //         showcaseData: originalData[index].homeShowcases

    //     })
    // }
    render(){

        const { originalData } = this.state;
        
        return (
            <>
                <section className="bg-primary-alt showcase-sec-wrap inside-arrow">
                    <div className="container">
                        <div className="row justify-content-left mb-4">
                            <div className="col-lg-12 col-xl-12 text-left">
                                <h2 className="h1">Showcase</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 col-xl-12">
                                <div data-flickity='{ "imagesLoaded": true, "wrapAround": true }' className="mb-5">
                                    {
                                        originalData.length > 0 &&
                                        <Flickity
                                            className={'carousel-cell'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate={true} // default false
                                            static={true} // default false
                                        >
                                        {
                                            originalData.length > 0 &&
                                            originalData.map((showcaseDataGet, index) => {
                                                return (
                                                    <div key={index} className="carousel-cell col-xl-4 col-lg-4 col-md-5 col-9 pb-1">
                                                        <div className="carousel-cell">

                                                            <img src={showcaseDataGet.showcase_image.url ? process.env.GRAPHIMAGEURL + showcaseDataGet.showcase_image.url : "/assets/images/female-2.jpg" } />
                                                            <div className="card-wrap">
                                                                <h4>{showcaseDataGet.showcase_title}</h4>
                                                                <p>{showcaseDataGet.showcase_description}</p>
                                                            </div>
                                                        </div>
                                                    </div> 
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

export default Showcase;