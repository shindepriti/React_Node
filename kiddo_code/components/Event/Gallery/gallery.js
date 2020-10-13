import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Flickity from 'react-flickity-component';
import Router from 'next/router';

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
            allEvents: []
        };
    }

    componentDidMount() {
        let id = Router.query.id;
        let splitData = id.split('-');
        var query = `
                    query ActivityById($id: ID!){
                        products(where:{id:$id}){
                            id,
                            product_name,
                            product_introduction,
                            product_hours,
                            product_type{
                            id,
                            product_type
                            },
                            product_events{
                                id,
                              event_title,
                              event_description,
                              event_image{
                                name,url
                              }
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
                this.setState({
                    allEvents: response.data.products.length ? response.data.products[0].product_events : [],
                });
            });

        //console.log(homeBannerData);
    }
    render() {
        const { allEvents } = this.state;
        return (
            <>
                <section className="showcase-sec-wrap inside-arrow p-5">
                    <div className="container">
                        <div className="row justify-content-left mb-4">
                            <div className="col-lg-12 col-xl-12 text-left">
                                <h2>Event gallery  </h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 col-xl-12">
                                {
                                    allEvents.length > 0 ? (
                                        <Flickity
                                            className={'carousel-cell'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate={true} // default false
                                            static={true} // default false
                                        >
                                            {
                                                allEvents.map((event, index) => {
                                                    return (
                                                        <div className="carousel-cell col-xl-4 col-lg-4 col-md-5 col-9 pb-1">
                                                            <div className="carousel-cell">
                                                                <img src=
                                                                    {event.event_image.url ? process.env.GRAPHIMAGEURL + event.event_image.url : "http://54.255.146.92/wp-content/uploads/2020/06/safe.png"} />
                                                                <div className="card-wrap">
                                                                    <h4>{event.event_title}</h4>
                                                                    <p>{event.event_description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Flickity>
                                    ) : ''
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