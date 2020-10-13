import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Glance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            at_a_glance_text_1: "",
            at_a_glance_text_2: "",
            at_a_glance_text_3: "",
            at_a_glance_text_4: "",
            at_a_glance_number_1: "",
            at_a_glance_number_2: "",
            at_a_glance_number_3: "",
            at_a_glance_number_4: "",
        };
    }

    componentDidMount() {
        var query = `
                    query ActivityById($id: ID!){
                        atAGlances(where:{id:$id}){
                            id,
                            at_a_glance_text_1,
                            at_a_glance_text_2,
                            at_a_glance_text_3,
                            at_a_glance_text_4,
                            at_a_glance_number_1,
                            at_a_glance_number_2,
                            at_a_glance_number_3,
                            at_a_glance_number_4
                        }
                    }
                    `;
        var variables = {
            "id": 1
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let glanceData = response.data.atAGlances[0];
                //console.log(homeBanner); 
                this.setState({
                    at_a_glance_text_1: glanceData.at_a_glance_text_1,
                    at_a_glance_text_2: glanceData.at_a_glance_text_2,
                    at_a_glance_text_3: glanceData.at_a_glance_text_3,
                    at_a_glance_text_4: glanceData.at_a_glance_text_4,
                    at_a_glance_number_1: glanceData.at_a_glance_number_1,
                    at_a_glance_number_2: glanceData.at_a_glance_number_2,
                    at_a_glance_number_3: glanceData.at_a_glance_number_3,
                    at_a_glance_number_4: glanceData.at_a_glance_number_4,
                });
            });

        //console.log(homeBannerData);
    }
    render(){

        return (
            <>
                <section className="dark-blue-bg at-glance-wrap">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col">
                                <h2>At a glance</h2>
                            </div>
                        </div>
                        {/* <div className="row justify-content-center col-lg-10" >
                            <div className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="0" data-end="10" data-duration="3" data-grouping="true" data-suffix="">{this.state.at_a_glance_number_1 ? this.state.at_a_glance_number_1 : ""}</span>
                                <span className="h6">{this.state.at_a_glance_text_1 ? this.state.at_a_glance_text_1 : ""}</span>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="150" data-end="1500" data-duration="3" data-grouping="true" data-suffix="">{this.state.at_a_glance_number_2 ? this.state.at_a_glance_number_2 : ""}</span>
                                <span className="h6">{this.state.at_a_glance_text_2 ? this.state.at_a_glance_text_2 : ""}</span>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="100000" data-end="1500000" data-duration="3" data-grouping="true" data-suffix="+">{this.state.at_a_glance_number_3 ? this.state.at_a_glance_number_3 : ""}+</span>
                                <span className="h6">{this.state.at_a_glance_text_3 ? this.state.at_a_glance_text_3 : ""}</span>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="10" data-end="250" data-duration="3" data-grouping="true" data-suffix="">{this.state.at_a_glance_number_4 ? this.state.at_a_glance_number_4 : ""}</span>
                                <span className="h6">{this.state.at_a_glance_text_4 ? this.state.at_a_glance_text_4 : ""}</span>
                            </div>
                        </div> */}
                        <div className="row justify-content-center col-lg-10">
                            <div className="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <span className="display-4 text-primary d-block mb-10" data-countup="" data-start="0" data-end="10" data-duration="3" data-grouping="true" data-suffix="" >10</span>
                                <span className="h6">Registered Students</span>
                            </div>
                            
                         </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Glance;
