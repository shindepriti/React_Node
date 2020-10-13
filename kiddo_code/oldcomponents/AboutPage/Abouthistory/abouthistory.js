import React, {Component} from 'react';
import moment from 'moment';
const fetch = require('isomorphic-fetch');

class Abouthistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyData:[]
        };
    }

    componentDidMount() {
        var query = `
                    query ActivityById($id: ID!){
                        aboutHistories(where:{id:$id}){
                            id,
                            historyabout{
                                id,
                                history_date,
                                history_description
                            }
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
                let blogData = response.data.aboutHistories[0];
                //console.log(homeBanner);
                this.setState({
                    historyData: blogData.historyabout
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        const { historyData } = this.state;
        return (
            <>
                <section className="o-hidden pt-0 mt-6 history-wrap-sec">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col">
                                <h2 className="text-center">Our History</h2>
                            </div>
                        </div>
                        <div className="row o-hidden o-lg-visible">
                            <div className="col d-flex flex-column align-items-center">
                                <ol className="process-vertical">
                                    {
                                        historyData.length > 0 &&
                                        historyData.map((historyData, index) => {
                                            return (
                                                <li key={index} data-aos="fade-left" >
                                                    <div className="process-circle bg-primary"></div>
                                                    <div>
                                                        <span className="text-small text-muted"> {moment(historyData.history_date).format("MMMM ,YYYY")} </span>
                                                        <h5 className="mb-0">{historyData.history_description}</h5>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        ) 
    }
}

export default Abouthistory;