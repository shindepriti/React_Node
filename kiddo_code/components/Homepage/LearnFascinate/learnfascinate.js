
import React, { Component } from 'react';
import Flickity from 'react-flickity-component';

const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
const fetch = require('isomorphic-fetch');

class LearnFascinate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLearnProducts: [],
            productLearnTopicsData: [],
            getLearnProducts: [],
            mergeProductTopicData: [],
            collapse: 0
        };
    }

    componentDidMount() {
        console.log("In Learn Fascinate Component Did Mount");
        var query = `
                    query {
                            productTopics{
                                id,
                                product_topic_name,
                                product_topic_show,
                                product_topic_image{
                                name,
                                url
                                }
                        },
                        products{
                                id,
                                product_name,
                                product_introduction,
                                product_hours,
                                product_slug,
                                product_type{
                                    id,
                                    product_type
                                },
                                product_topic {
                                    id,
                                    product_topic_name
                                },
                                product_media {
                                    url,
                                    name
                                },
                                product_sell_price
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
                let getProductData = (response.data && response.data.productTopics) ? response.data.productTopics : [];
                // console.log('>>>>>>>', getProductData);

                let allLearnProducts = (response.data && response.data.products) ? response.data.products : [];

                let products = allLearnProducts.filter((item) => {
                    if (item.product_topic != null) {
                        return (item.product_topic.product_topic_name === getProductData[0].product_topic_name)
                    }
                })

                let mergeProductwithTopic = [];

                for(let i=0;i<getProductData.length;i++) {
                    let temp = {};
                    let products = allLearnProducts.filter((item) => {
                        if (item.product_topic != null) {
                            return (item.product_topic.product_topic_name === getProductData[i].product_topic_name)
                        }
                    });

                    temp = {
                        "topic_name": getProductData[i].product_topic_name,
                        "products": products
                    };
                    mergeProductwithTopic.push(temp);
                }
                


                // productLearnTopicsDataGet.product_topic_name
                // console.log(getProductData[0].products[0].product_type.product_type);
                this.setState({
                    productLearnTopicsData: getProductData,
                    getLearnProducts: products,
                    allLearnProducts: allLearnProducts,
                    mergeProductTopicData: mergeProductwithTopic
                });
            });

        //console.log(homeBannerData);

    }
    getProductData = (topicName) => {
        let allLearnProducts = this.state.allLearnProducts
        let products = allLearnProducts.filter((item) => {
            if (item.product_topic != null) {
                return (item.product_topic.product_topic_name === topicName)
            }
        })
        this.setState({
            getLearnProducts: products
        })

    }

    collapseDiv = (index) => {
        this.setState({
            collapse: index
        })
    }

    render() {
        const { productLearnTopicsData, getLearnProducts, mergeProductTopicData, collapse } = this.state;
        //console.log(getLearnProducts);
        return (
            <>
                <section className="fascinates-section inside-arrow pt-6 pb-6">
                    <div className="container">
                        <div className="row justify-content-center text-center mb-3">
                            <div className="col-xl-8 col-lg-9">
                                <h2 className="mx-xl-8"> Learn what fascinates you.</h2>
                            </div>
                        </div>
                        <div className="row justify-content-left mb-5 cat-listing-row mobile-none">
                            <div className="col-xl-12 d-flex cat-listing">
                                <div className="cat-title">
                                    <h5>Topics </h5>
                                </div>
                                <ul className="nav justify-content-left fascinates-section-card" role="tablist">
                                    {
                                        productLearnTopicsData.length > 0 &&
                                        productLearnTopicsData.map((productLearnTopicsDataGet, index) => {
                                            return (
                                                <li key={index} className={index == 0 ? "nav-item mx-1 active" : "nav-item mx-1"} onClick={() => { this.getProductData(productLearnTopicsDataGet.product_topic_name) }}>
                                                    <a className={index == 0 ? "nav-link active" : "nav-link"} href={"#product-tab-" + productLearnTopicsDataGet.id} data-toggle="tab" role="tab" aria-controls={"#product-tab-" + productLearnTopicsDataGet.id} aria-selected="true">
                                                        {productLearnTopicsDataGet.product_topic_name}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <a href="#" className="align-self-center sell-all-txt text-primary">See all <span className="hover-arrow" aria-hidden="true"></span></a>
                            </div>
                        </div>
                        <div className="row justify-content-center mobile-none">
                            <div className="col-xl-12 aos-init aos-animate">
                                <div className="tab-content">
                                    {
                                        getLearnProducts.length > 0 ? (
                                            <Flickity
                                                className={'carousel-cell'} // default ''
                                                elementType={'div'} // default 'div'
                                                options={flickityOptions} // takes flickity options {}
                                                disableImagesLoaded={false} // default false
                                                reloadOnUpdate={true} // default false
                                                static={false} // default false
                                            >

                                                {

                                                    getLearnProducts.map((productLearnTopicsDataNewGet, index) => {
                                                        var product_type = (productLearnTopicsDataNewGet.product_type) ? productLearnTopicsDataNewGet.product_type.product_type.toLowerCase() : '';
                                                        return (
                                                            <div key={index} className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                                <div className="carousel-cell">
                                                                    <a href={`explore/${product_type}/${productLearnTopicsDataNewGet.id}-${productLearnTopicsDataNewGet.product_slug}-${product_type}`} className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                            <img className="" src=
                                                                                {productLearnTopicsDataNewGet.product_media.url ? process.env.GRAPHIMAGEURL + productLearnTopicsDataNewGet.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg="" />
                                                                        </div>
                                                                        <h5 className="mb-4">{productLearnTopicsDataNewGet.product_name}</h5>
                                                                        <span className="badge badge-primary rounded-0 bg-light-gray-cls"><img className="mr-1" src="assets/images/education-cap.svg" /> {(productLearnTopicsDataNewGet.product_types && productLearnTopicsDataNewGet.product_types.product_type) ? productLearnTopicsDataNewGet.product_types.product_type : ''}   </span>
                                                                        <span className="badge badge-primary rounded-0 bg-dark-gray-cls">{productLearnTopicsDataNewGet.product_hours} Hours</span>
                                                                        <span className="badge rounded-0 badge-txt text-blue">{productLearnTopicsDataNewGet.product_courses} Courses </span>
                                                                    </a>
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
                        
                        <div className="curriculum-sec desktop-none">
                            <div className="border-top pt-2 mb-2 w-100">
                                {
                                    mergeProductTopicData.length > 0 &&
                                    mergeProductTopicData.map((product, index) => {
                                        return (
                                            <>
                                                <div key={index} data-target={`#panel-${index}`} onClick={() => this.collapseDiv(index)} className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="true">
                                                    <span className="h5 mb-1 w-100 text-dark">{product.topic_name}  <i className="fa fa-angle-down"></i></span>
                                                </div>
                                                <div key={index} className={collapse === index ? "collapse show" : "collapse"} id={`#panel-${index}`}>
                                                    <div className="pt-2">
                                                        <div>
                                                            {
                                                                product.products.length > 0 ? (
                                                                    <Flickity
                                                                        className={'carousel-cell'} // default ''
                                                                        elementType={'div'} // default 'div'
                                                                        options={flickityOptions} // takes flickity options {}
                                                                        disableImagesLoaded={false} // default false
                                                                        reloadOnUpdate={true} // default false
                                                                        static={false} // default false
                                                                    >
                
                                                                        {
                
                                                                            product.products.map((productLearnTopicsDataNewGet, index1) => {
                                                                                var product_type = (productLearnTopicsDataNewGet.product_type) ? productLearnTopicsDataNewGet.product_type.product_type.toLowerCase() : '';
                                                                                return (
                                                                                    <div key={index1} className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                                                        <div className="carousel-cell">
                                                                                            <a href={`explore/${product_type}/${productLearnTopicsDataNewGet.id}-${productLearnTopicsDataNewGet.product_slug}-${product_type}`} className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                                                                <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                                                    <img className="" src=
                                                                                                        {productLearnTopicsDataNewGet.product_media.url ? process.env.GRAPHIMAGEURL + productLearnTopicsDataNewGet.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg="" />
                                                                                                </div>
                                                                                                <h5 className="mb-4">{productLearnTopicsDataNewGet.product_name}</h5>
                                                                                                <span className="badge badge-primary rounded-0 bg-light-gray-cls"><img className="mr-1" src="assets/images/education-cap.svg" /> {(productLearnTopicsDataNewGet.product_types && productLearnTopicsDataNewGet.product_types.product_type) ? productLearnTopicsDataNewGet.product_types.product_type : ''}   </span>
                                                                                                <span className="badge badge-primary rounded-0 bg-dark-gray-cls">{productLearnTopicsDataNewGet.product_hours} Hours</span>
                                                                                                <span className="badge rounded-0 badge-txt text-blue">{productLearnTopicsDataNewGet.product_courses} Courses </span>
                                                                                            </a>
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
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default LearnFascinate;