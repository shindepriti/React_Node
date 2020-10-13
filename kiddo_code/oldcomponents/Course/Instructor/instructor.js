import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';

class Instructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerdescription: "",
            bannerUrl: "",
            bannerName: ""
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
                            course_stat{
                              id,
                              course_stat,
                              cousrse_stat_name,
                              productcourse{
                                id,
                                course_count,
                                course_text
                              }
                            },
                            instructor{
                              team_title,
                              team_name,
                              team_decription,
                              team_image{
                                name,
                                url
                              },
                              team_position
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
            // console.log(response);
            let productData = [];
            if (response.data.products) {
                // console.log(response.data); 
                productData = response.data.products[0];

                this.setState({
                    product_instructor: productData.instructor[0],

                });
            }
            
        });

        //console.log(homeBannerData);
    }
    render(){
              const { product_instructor } = this.state;
        return (
            <>
                 <section className="has-divider light-gray-bg animate-txt-section">
                    <div className="divider flip-y mobile-none">
                      <svg width="100%" height="96px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none" className="injected-svg" data-src="assets/img/dividers/divider-2.svg">
                          <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"></path>
                      </svg>
                    </div>
                    <div className="container pt-0" data-aos="fade-up">
                      <div className="row align-items-center justify-content-around">
                        <div className="col-md-5 mb-2">
                          <div className="text-center desktop-none"><span className="new-tag dark-blue-bg text-light text-inherit">Instructor </span></div>
                          <img src="/assets/images/course-2.png" alt="Image" className="rounded-circle layer-2 p-3"/>
                          <div className="decoration top left ml-n5" data-aos="fade-up"> 
                            <img src="/assets/images/31.svg"/>
                          </div>
                          <div className="decoration top right mt-1 mr-6" data-aos="fade-up"> 
                            <img src="/assets/images/32.svg"/>
                          </div>
                          <div className="decoration bottom left ml-n6" data-aos="fade-right">
                            <img src="/assets/images/triagle-blue.svg" className="mobile-none"/>
                            <img src="/assets/images/triagle-lightblue.svg" className="desktop-none"/>
                          </div>
                          <div className="decoration bottom right mb-6" data-aos="fade-right">
                            <img src="/assets/images/squre-light-blue.svg"/>
                          </div>
                        </div>
                        <div className="col-xl-6 col-md-6">
                          <span className="new-tag dark-blue-bg text-light text-inherit mobile-none">{product_instructor ? product_instructor.team_position : ''}  </span>
                          <div className="h1 font-weight-bold mt-2">
                              {product_instructor ? product_instructor.team_title : ''}
                          </div>
                          <p className="h6 h5 font-weight-normal">{product_instructor ? product_instructor.team_decription : ''}</p>
                          <a href="#" className="h6 text-primary">@{product_instructor ? product_instructor.team_name : ''}</a>
                        </div>
                      </div>
                    </div>
                  </section>
            </>
        )
    }
}

export default Instructor;