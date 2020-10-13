import React, {Component} from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
    initialIndex: 0,
    accessibility: true,
    pageDots: false,
    wrapAround: true
}

const fetch = require('isomorphic-fetch');

class Aboutteam extends Component {
     constructor(props) {
        super(props);
        this.state = {
            leaderTeams: [],
            showcaseData: []
        };
    }

    componentDidMount() {
        var query = `query {
                         leadershipTeams{
                              id,
                              leader_name,
                              leader_position,
                              leader_image{
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
                let finalResponse = response.data.leadershipTeams;
                this.setState({
                    leaderTeams: finalResponse
                });
            });

        
    }
    // getShowcasesData = (index) => {
    //     let originalData = this.state.originalData;

    //     this.setState({
    //         showcaseData: originalData[index].homeShowcases

    //     })
    // }


   render(){

        const { leaderTeams } = this.state;
        console.log(leaderTeams);
        return (
            <>
                <section className="p-0 team-sec-wrap">
                    <div className="container py-6">
                        <div className="row mb-4 aos-init aos-animate" data-aos="fade-up">
                            <div className="col">
                                <h2 className="text-center">Leadership Team</h2>
                            </div>
                        </div>
                        <div className="row mb-3">

                             {
                                leaderTeams.length > 0 &&
                                leaderTeams.map((leaderTeamsGet, index) => {
                                    return (

                                        <div className="col-xl-3 col-lg-4 col-md-6">
                                            <div className="card card-lg card-body align-items-center rounded-0">
                                                <img src={leaderTeamsGet.leader_image.url ? process.env.GRAPHIMAGEURL + leaderTeamsGet.leader_image.url : "/assets/images/female-2.jpg" } />
                                                <h5 className="mb-0">{leaderTeamsGet.leader_name}</h5>
                                                <span>{leaderTeamsGet.leader_position}</span>
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>Interested in joining our team? <a href="#" className="text-blue">View career openings</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Aboutteam;