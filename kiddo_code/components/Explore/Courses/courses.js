import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productTypesGet: [],
            selectedTopic: {},
            productTopicsGet: {
              type: "", 
              data: []
            },
            productsGet: {
               type: "",
              data: []
            },
            teamData: []
        };
        this.getProductData = this.getProductData.bind(this)
        this.getProductTopicData = this.getProductTopicData.bind(this)
    }

    componentDidMount() {
        var query = `
            query {
                productTypes{
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
                        id
                      },
                      product_topic {
                        id
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
                let topicId= getProductDataFilter[0].id
                let subTopicId= getProductDataFilter[0].product_topics[0].id
                let products =  getProductDataFilter[0].product_topics[0].product.filter((item) => {
                  if(item.product_type != null){
                    return (item.product_type.id === topicId) &&  (item.product_topic.id ===subTopicId)
                  }
                }) 

                this.setState({
                    productTypesGet: getProductDataFilter,
                    productTopicsGet: {
                      type: getProductDataFilter[0],
                      data: getProductDataFilter[0].product_topics
                    },
                    productsGet: {
                      type: getProductDataFilter[0].product_topics[0],
                      data:   products
                    }
                });
            });

        //console.log(homeBannerData);
    }

    getProductData = (subtopic, index) => {
          let productTopicsGet = this.state.productTopicsGet.data;
          let typeId= this.state.selectedTopic && this.state.selectedTopic.id ? this.state.selectedTopic.id : 0;
          let subtopicId= subtopic && subtopic.id ? subtopic.id : 0;
    

          this.setState({
              productsGet: {
                type: subtopic,
                data: (productTopicsGet && productTopicsGet[index]) ? productTopicsGet[index].product.filter((item) => {
                      if(item.product_type != null){
                        return (item.product_type.id === typeId) &&  (item.product_topic.id ===subtopicId)
                      }
                }) : [],
              }
          })
      }
    getProductTopicData = (topic, index) => {
          let productTypesGet = this.state.productTypesGet;
          this.setState({
              selectedTopic: productTypesGet[index],
              productTopicsGet:{
                type: topic,
                data:  productTypesGet[index].product_topics
              },
          }, () => {
            this.getProductData(productTypesGet[index].product_topics[0], 0)
          })
      }

    

    render(){

      const { productTypesGet,productTopicsGet, productsGet } = this.state;
      let product_type_get = (productTopicsGet.type.product_type) ? productTopicsGet.type.product_type.toLowerCase() : '';      
        return (
            <>
                <section className="p-0 text-dark explore-sec pl-3 pr-3">
                  <div className="container">
                    <div className="row justify-content-left mb-0 cat-listing-row">
                      <div className="col-xl-12 d-flex align-items-center justify-content-center">
                        <div className="cat-title">
                          <h5 className="mb-0">Courses  </h5>
                        </div>
                          <ul className="nav justify-content-left" role="tablist">
                               {
                                    productTypesGet.length > 0 &&
                                    productTypesGet.map((productTypesGetValue, index) => {
                                        return (
                                          <li key={index}  className="nav-item mx-1" onClick={() => { this.getProductTopicData(productTypesGetValue, index) }}>
                                              <a className={index == 0  ? "nav-link active":"nav-link"} href="#Courses-tab-1" data-toggle="tab" role="tab" aria-controls="Courses-tab-1" aria-selected="true">
                                                  {productTypesGetValue.product_type} 
                                              </a>
                                          </li>
                                        )
                                    })
                                } 
                            </ul>
                      </div>
                    </div>
                  </div>
                </section>

                 <div className="tab-content explore-details-sec">
                    <div className="tab-pane fade show active" id="Courses-tab-1" role="tabpanel" aria-labelledby="Courses-tab-1">
                      <section className="bg-dark-blue p-3 text-light explore-sec">
                        <div className="container">
                          <div className="row justify-content-left mb-0 cat-listing-row">
                            <div className="col-xl-12 d-flex align-items-center justify-content-center">
                              <div className="cat-title">
                                <h5 className="mb-0">Topics </h5>
                              </div>
                                <ul className="nav justify-content-left" role="tablist">
                                       {
                                          productTopicsGet.data && productTopicsGet.data.length > 0 &&
                                          productTopicsGet.data.map((productTopicsGetValue, index) => {
                                              return (
                                                <li key={index}  className="nav-item mx-1" onClick={() => { this.getProductData(productTopicsGetValue, index) }}>
                                                    <a className={index == 0  ? "nav-link active":"nav-link"} href="#Courses-tab-1" data-toggle="tab" role="tab" aria-controls="Courses-tab-1" aria-selected="true">
                                                        {productTopicsGetValue.product_topic_name} 
                                                    </a>
                                                </li>
                                              )
                                          })
                                      } 
                                  </ul>
                                <h2 className="mb-0"><a href="#" className="align-self-center sell-all-txt text-light"><span className="hover-arrow" aria-hidden="true"></span></a></h2>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="fascinates-section inside-arrow pt-6 pb-6">
                        
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                              <div className="tab-content">
                                <div className="tab-pane fade show active" id="product-tab-1" role="tabpanel" aria-labelledby="product-tab-1">
                                  <div className="arrows-inside flickity-enabled is-draggable row" tabindex="0">
                                    
                                    {
                                          productsGet.data && productsGet.data.length > 0 &&
                                          productsGet.data.map((productsGetValue, index) => {
                                              return (
                                                <div className="carousel-cell col-xl-3 col-lg-3 col-md-4 pb-0">
                                                    <div className="carousel-cell">
                                                        <div className="card card-icon-2 card-body justify-content-between hover-shadow-3d rounded-0 mb-0">
                                                              <div className="icon-round mb-3 mb-md-4 icon bg-primary tabs-img-wrap pd-20">
                                                                  <img className="" src={productsGetValue.product_media.url ? process.env.GRAPHIMAGEURL + productsGetValue.product_media.url : "/assets/images/Vector.svg"} alt="JS" data-inject-svg=""/>
                                                              </div>
                                                              <div className="tabs-details-wrap">
                                                                <h4 className="mb-0"><a href={`explore/${product_type_get}/${productsGetValue.id}-${productsGetValue.product_slug}-${product_type_get}`}>{productsGetValue.product_name}</a></h4>
                                                                {/*<p className="price"><strong>RM{productsGetValue.product_price}<span className="price-tag"><span>RM{productsGetValue.product_sell_price}</span><span className="discount-tag">-20%</span></span></strong></p>
                                                                <a href="#" className="add-to-cart-btn btn">Add to Cart</a>*/}
                                                              </div>
                                                          </div> 
                                                    </div>
                                                </div> 
                                              )
                                          })
                                      }                                 
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                    </div>
                 </div>
            </>
        )
    }
}

export default Teams;