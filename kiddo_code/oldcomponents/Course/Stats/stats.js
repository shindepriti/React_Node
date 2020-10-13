import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerdescription: "",
            bannerUrl: "",
            bannerName: "",
            course_stat: []
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
                              productcourse{
                                id,
                                course_count,
                                course_text
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
            // console.log(response);
            let productData = [];
            if (response.data.products) {
                productData = response.data.products[0];
                // console.log(productData.course_stat.productcourse); 
                this.setState({
                    course_stat: productData.course_stat.productcourse,
                });
            }
            
        });

        //console.log(homeBannerData);
    }
    render(){
        const { course_stat } = this.state;

        return (
            <>
               <section className="bg-dark-gray at-glance-wrap" style={{}}>
                  <div className="container">
                      <div className="row mb-4">
                          <div className="col">
                              <h2>Course stats </h2>
                          </div>
                      </div>
                        <div className="row justify-content-center col-md-9">
                           {
                                course_stat.length > 0 &&
                                course_stat.map((course_stats, index) => {
                                    return (
                                        <div key={index} className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                          <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="0" data-end={course_stats.course_count} data-duration="3" data-grouping="true" data-suffix="" style={{}}>{course_stats.course_count} </span>
                                            <span className="h6"> {course_stats.course_text}</span>
                                        </div>
                                    )
                                })
                            }
                                      
                                
                        </div>
                  </div>
              </section>
            </>
        )
    }
}

export default Stats;