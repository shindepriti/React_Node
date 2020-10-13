import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';
import Flickity from 'react-flickity-component';

const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

class Creativity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creativityData: []
        };
    }

    componentDidMount() {
        let id = Router.query.id;
        let splitData = id.split('-');
        var query = `
        query {
            studentCreativities{
              id,
              creativity_header,
              creativity_description,
              creativity_image{
                url,
                name
              }
            }
        }
                    `;
        var variables = {
            "id": Number(splitData[0])
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let studentCreativities = response.data.studentCreativities;
                this.setState({
                    creativityData: studentCreativities ? studentCreativities : null
                });
            });

        //console.log(homeBannerData);
    }
    render() {
        const { creativityData } = this.state;
        return (
            <>
                <section className="showcase-sec-wrap inside-arrow p-5">
                    <div className="container">
                        <div className="row justify-content-left mb-4">
                            <div className="col-lg-12 col-xl-12 text-left">
                                <h2>Our students creativity </h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 col-xl-12">
                                {
                                    creativityData.length > 0 &&
                                    <Flickity
                                        className={'carousel-cell'} // default ''
                                        elementType={'div'} // default 'div'
                                        options={flickityOptions} // takes flickity options {}
                                        disableImagesLoaded={false} // default false
                                        reloadOnUpdate={true} // default false
                                        static={true} // default false
                                    >
                                        {
                                            creativityData.length > 0 &&
                                            creativityData.map((creativityDataGet, index) => {
                                                var img = creativityDataGet.creativity_image.url ? process.env.GRAPHIMAGEURL + creativityDataGet.creativity_image.url : "/assets/images/female-2.jpg";
                                                return (
                                                    <div key={"creativity_"+index} className="carousel-cell col-xl-4 col-lg-4 col-md-5 col-9 pb-1">
                                                        <div className="carousel-cell">
                                                            <img src={img} />
                                                            <div className="card-wrap">
                                                                <h4>{creativityDataGet.creativity_header}</h4>
                                                                <p>{creativityDataGet.creativity_description}</p>
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
                </section>
            </>
        )
    }
}

export default Creativity;