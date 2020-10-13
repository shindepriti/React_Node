
import React, { Component } from 'react';
import Flickity from 'react-flickity-component';

const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
const fetch = require('isomorphic-fetch');

class HomeProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            productTopicsData: [],
            getProducts: [],
        };
    }

    componentDidMount() {
        // var query = `
        //             query ActivityById($id: ID!){
        //                 headerTitles(where:{id:$id}){
        //                     id,
        //                     header_title
        //                 }
        //             }
        //             `;
        // var variables = {
        //     "id": 1
        // }
        // fetch(process.env.GRAPHURL, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ query, variables }),
        //     })
        //     .then(response => response.json())
        //     .then((response) => {
        //         //console.log(response);
        //         let headerTitle = response.data.headerTitles[0];
        //         //console.log(homeBanner); 
        //         this.setState({
        //             headerTitle: headerTitle.header_title
        //         });
        //     });




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

                let allProducts = (response.data && response.data.products) ? response.data.products : [];

                let products = allProducts.filter((item) => {
                    if (item.product_topic != null) {
                        return (item.product_topic.product_topic_name === getProductData[0].product_topic_name)
                    }
                })
                // productTopicsDataGet.product_topic_name
                // console.log(getProductData[0].products[0].product_type.product_type);
                this.setState({
                    productTopicsData: getProductData,
                    getProducts: products,
                    allProducts: allProducts
                });
            });

        //console.log(homeBannerData);

    }
    getProductData = (topicName) => {
        let allProducts = this.state.allProducts
        let products = allProducts.filter((item) => {
            if (item.product_topic != null) {
                return (item.product_topic.product_topic_name === topicName)
            }
        })
        this.setState({
            getProducts: products
        })

    }

    render() {
        const { productTopicsData, getProducts } = this.state;
        //console.log(getProducts);
        return (
            <>
                <section className="fascinates-section inside-arrow pt-6 pb-6">
                    <div className="container">
                        <div className="row justify-content-center text-center mb-3">
                            <div className="col-xl-8 col-lg-9">
                                <h2 className="mx-xl-8"> Learn what fascinates you.</h2>
                            </div>
                        </div>
                        <div className="row justify-content-left mb-5 cat-listing-row">
                            <div className="col-xl-12 d-flex cat-listing">
                                <div className="cat-title">
                                    <h5>Topics </h5>
                                </div>
                                <ul className="nav justify-content-left fascinates-section-card" role="tablist">
                                    {
                                        productTopicsData.length > 0 &&
                                        productTopicsData.map((productTopicsDataGet, index) => {
                                            return (
                                                <li key={index} className={index == 0 ? "nav-item mx-1 active" : "nav-item mx-1"} onClick={() => { this.getProductData(productTopicsDataGet.product_topic_name) }}>
                                                    <a className={index == 0 ? "nav-link active" : "nav-link"} href={"#product-tab-" + productTopicsDataGet.id} data-toggle="tab" role="tab" aria-controls={"#product-tab-" + productTopicsDataGet.id} aria-selected="true">
                                                        {productTopicsDataGet.product_topic_name}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <a href="#" className="align-self-center sell-all-txt text-primary">See all <span className="hover-arrow" aria-hidden="true"></span></a>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-12 aos-init aos-animate">
                                <div className="tab-content">
                                    {
                                        getProducts.length > 0 ? (
                                            <Flickity
                                                className={'carousel-cell'} // default ''
                                                elementType={'div'} // default 'div'
                                                options={flickityOptions} // takes flickity options {}
                                                disableImagesLoaded={false} // default false
                                                reloadOnUpdate={true} // default false
                                                static={false} // default false
                                            >

                                                {

                                                    getProducts.map((productTopicsDataNewGet, index) => {
                                                        var product_type = (productTopicsDataNewGet.product_type) ? productTopicsDataNewGet.product_type.product_type.toLowerCase() : '';
                                                        return (
                                                            <div key={index} className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                                <div className="carousel-cell">
                                                                    <a href={`explore/${product_type}/${productTopicsDataNewGet.id}-${productTopicsDataNewGet.product_slug}-${product_type}`} className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                            <img className="" src=
                                                                                {productTopicsDataNewGet.product_media.url ? process.env.GRAPHIMAGEURL + productTopicsDataNewGet.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg="" />
                                                                        </div>
                                                                        <h5 className="mb-4">{productTopicsDataNewGet.product_name}</h5>
                                                                        <span className="badge badge-primary rounded-0 bg-light-gray-cls"><img className="mr-1" src="assets/images/education-cap.svg" /> {(productTopicsDataNewGet.product_types && productTopicsDataNewGet.product_types.product_type) ? productTopicsDataNewGet.product_types.product_type : ''}   </span>
                                                                        <span className="badge badge-primary rounded-0 bg-dark-gray-cls">{productTopicsDataNewGet.product_hours} Hours</span>
                                                                        <span className="badge rounded-0 badge-txt text-blue">{productTopicsDataNewGet.product_courses} Courses </span>
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
                    </div>
                </section>
            </>
        )
    }
}

export default HomeProduct;