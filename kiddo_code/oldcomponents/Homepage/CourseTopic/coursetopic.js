import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

const fetch = require('isomorphic-fetch');
class CourseTopic extends Component {
     constructor(props) {
        super(props);
        this.state = {
            productTopicsData: []            
        };
    }

    componentDidMount() {
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
                let finalResponse = response.data.productTopics;
                this.setState({
                    productTopicsData: finalResponse
                });
            });

        
    }


   render(){

        const { productTopicsData } = this.state;
           


        return (
            <>
                <section className="ever-expanding-section">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col">
                                <h2 className="h1 font-weight-normal">Choose from an ever-expanding selection of topics</h2>
                            </div>
                        </div>   
                        <div className="row">
                            {
                                productTopicsData.length > 0 &&  
                                productTopicsData.map((productTopicsDataGet, index) => {
                                        var img = productTopicsDataGet.product_topic_image.url ? process.env.GRAPHIMAGEURL + productTopicsDataGet.product_topic_image.url : "/assets/images/female-2.jpg" ;
                                    
                                        return (
                                            
                                             <div key={index} className="col-md-6 col-lg-3 d-flex aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                                <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d" style={{ backgroundImage:`url(${img})` }}>
                                                    <h5 className="mb-0">{productTopicsDataGet.product_topic_name}  </h5>
                                                </a>
                                            </div> 
                                            
                                        )
                                })
                            }
                        </div>
                                                    
                        <div className="row">
                            <div className="col mt-3">
                                <a href="#">View course catalog <span className="hover-arrow"></span></a>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default CourseTopic;