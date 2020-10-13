import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import Flickity from 'react-flickity-component';
import Router from 'next/router';

const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}
class Learning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedLearning: [],
            product_topics: [],
            relatedLearningData: '',
            productsGet: {
               type: "",
              data: []
            }
        };
    }

    componentDidMount() {
      let id = Router.query.id;
      let splitData = id.split('-');
      
        var query = `
            query {
                productTypes(where:{product_type:"Course"}){
                  id,
                  product_type,
                  product_topics{
                    id,
                    product_topic_name,
                    product{
                      id,
                      product_name,
                      product_price,
                      product_slug,
                      product_type {
                        id,
                        product_type
                      },
                      product_topic {
                        id,
                        product_topic_name
                      },
                      product_media{
                        url,
                        name
                      },
                      product_sell_price
                    }
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
              
                let getProductDataFilter = response.data.productTypes;
                // console.log('--data', getProductDataFilter)
                // let relatedLearningData= getProductDataFilter[0];
                // let subTopicId= getProductDataFilter[0].product_topics[0].id
                let products =  getProductDataFilter[0].product_topics[0].product.filter((item) => {
                  if(item.product_type != null){
                    return (item.product_type.product_type === 'Course') && (item.product_slug !== splitData[1] + '-' + splitData[2])
//                    return (item.product_type.product_type === 'Course') 
                  }
                }) 

                this.setState({
                    relatedLearning: getProductDataFilter,
                    product_topics: getProductDataFilter[0].product_topics,
                    productsGet: {
                      type: 'Course',
                      data:   products
                    }
                });
            });


        //console.log(homeBannerData);
    }


     getProductData = (product_topics, index) => {
        let id = Router.query.id;
        let splitData = id.split('-');
        let relatedLearning = this.state.relatedLearning;
        this.setState({
            productsGet: {
              type: product_topics,
              data: (relatedLearning && relatedLearning[0]) ? relatedLearning[0].product_topics[index].product.filter((item) => {
                    if(item.product_type != null){
                      // return (item.product_type.product_type === 'Course') &&  (item.product_topic.product_topic_name ===product_topics)
                      return (item.product_type.product_type === 'Course') && (item.product_slug !== splitData[1] + '-' + splitData[2]) && (item.product_topic.product_topic_name === product_topics)
                    }
              }) : [],
            }
        })
      }
    render(){
        const { relatedLearning,product_topics,productsGet } = this.state;
        console.log(productsGet.data.length);
        return (
            <>
                 <section className="fascinates-section inside-arrow pt-6 pb-6">
                    <div className="container">
                        <div className="row justify-content-center text-center mb-3">
                              <div className="col-xl-8 col-lg-9">
                                  <h2 className="mx-xl-8">Related learning  </h2>
                              </div>
                          </div>
                        <div className="row justify-content-left mb-5 cat-listing-row">
                            <div className="col-xl-12 d-flex cat-listing">
                              <div className="cat-title">
                                <h5>Topics </h5>
                              </div>
                                <ul className="nav justify-content-left" role="tablist">
                                    {
                                        product_topics.length > 0 &&
                                        product_topics.map((product_topicsGet, index) => {
                                            return (
                                                <li key={index} className="nav-item mx-1" onClick={() => { this.getProductData(product_topicsGet.product_topic_name, index) }}>
                                                    <a className={index == 0  ? "nav-link active":"nav-link"} href="#product-tab-1" data-toggle="tab" role="tab" aria-controls="product-tab-1" aria-selected="true">
                                                        {product_topicsGet.product_topic_name}
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
                            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                                  <div className="tab-content">
                                    <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">
                                    
                                    {
                                                productsGet.data.length > 0 ? (
                                                <Flickity
                                                    className={'carousel-cell'} // default ''
                                                    elementType={'div'} // default 'div'
                                                    options={flickityOptions} // takes flickity options {}
                                                    disableImagesLoaded={false} // default false
                                                    reloadOnUpdate={true} // default false
                                                    static={false} // default false
                                                >
                                            
                                            {
                                               
                                                    productsGet.data.map((productsGets, index) => {
                                                        return (
                                                             <div key={index} className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                                                <div className="carousel-cell">
                                                                    <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                                            <img className="" src=
                                                                            {productsGets.product_media.url ? process.env.GRAPHIMAGEURL + productsGets.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg="" />
                                                                        </div>
                                                                        <h5 className="mb-4">{productsGets.product_name}</h5>
                                                                        <span className="badge badge-primary rounded-0 bg-light-gray-cls"><img className="mr-1" src="assets/images/education-cap.svg"/> {(productsGets.product_types && productsGets.product_types.product_type) ? productsGets.product_types.product_type: ''}   </span>
                                                                        <span className="badge badge-primary rounded-0 bg-dark-gray-cls">{productsGets.product_hours} Hours</span>
                                                                        <span className="badge rounded-0 badge-txt text-blue">{productsGets.product_courses} Courses </span>
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
                                <div className="tab-pane fade" id="product-tab-2" role="tabpanel" aria-labelledby="product-tab-2">
                                    <div className="arrows-inside mb-6 is-draggable" data-flickity='{ "autoPlay": false, "imagesLoaded": true, "wrapAround": true }' tabIndex="0">
                                              <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Bezier curve.svg" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                    <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                          <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                              <img className="" src="/assets/images/Bucket.svg" alt="Python" data-inject-svg=""/>
                                                          </div>
                                                          <span className="badge badge-primary rounded-0">degree</span>
                                                          <span className="badge badge-primary rounded-0 bg-none">20 Hours</span>
                                                          <h3 className="mb-0">Python</h3>
                                                          <p>Lorem ipsum is dummy content.</p>
                                                          <p className="price"><strong>RM10.00</strong></p>
                                                      </a>
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Oval 2.svg" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="/assets/images/Apple-Watch.svg" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-1">
                                              <div className="carousel-cell">
                                                  <a href="#" className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0">
                                                        <div className="icon-round mb-3 mb-md-4 icon bg-primary pd-20">
                                                            <img className="" src="http://54.255.146.92/wp-content/uploads/2020/06/safe-150x150.png" alt="JS" data-inject-svg=""/>
                                                        </div>
                                                        <h3 className="mb-0">JS</h3>
                                                        <p className="price"><strong>RM50.00</strong></p>
                                                    </a> 
                                              </div>
                                          </div> 
                                          </div>
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

export default Learning;