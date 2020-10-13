import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            teamData: []
        };
    }

    componentDidMount() {
        var query = `
            query {
                categories{
                    id,
                    cat_name,
                    cat_image{
                        name,
                        url
                    },
                    teams{
                        id,
                        full_name,
                        team_tag,
                        position_text,
                        person_image{
                            name,
                            url
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
                //console.log(response);
                let finalResponse = response.data.categories;
                this.setState({
                    originalData: finalResponse,
                    teamData: finalResponse[0].teams,
                    catName: finalResponse[0].cat_name
                });
            });

        //console.log(homeBannerData);
    }

    getTeamsData = (index) => {
        let originalData = this.state.originalData;
        this.setState({
            teamData: originalData[index].teams,
            catName: originalData[index].cat_name
        })
    }

    render(){
        const { originalData , catName,teamData } = this.state;
        //console.log(teamData);
        return (
            <>
                <section className="light-gray-bg p-0 text-dark explore-sec pl-3 pr-3">
                    <div className="container">
                        <div className="row justify-content-left mb-0 cat-listing-row">
                            <div className="col-xl-12 d-flex align-items-center justify-content-center">
                                <div className="cat-title">
                                <h5 className="mb-0">Teams   </h5>
                                </div>
                                <ul className="nav justify-content-left" role="tablist">
                                    {
                                        originalData.length > 0 &&
                                        originalData.map((categoryData, index) => {
                                            return (
                                                <li key={index} className="nav-item mx-1" onClick={() => { this.getTeamsData(index) }}>
                                                    {categoryData.cat_name === catName && (
                                                        <a className="nav-link active" href="#team-tab-1" data-toggle="tab" role="tab" aria-controls="team-tab-1" aria-selected="true">
                                                            {categoryData.cat_name}
                                                        </a>)
                                                    }
                                                    {categoryData.cat_name !== catName &&  (
                                                            <a className="nav-link" href="#team-tab-1" data-toggle="tab" role="tab" aria-controls="team-tab-1" aria-selected="true">
                                                                {categoryData.cat_name}
                                                            </a>)
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container py-6">
                        <div className="row justify-content-center ">
                            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="management" role="tabpanel" aria-labelledby="management">
                                <h2 className="text-center mb-4">{catName} </h2>
                                    <div className="row mb-3">
                                            {
                                                teamData.length > 0 &&
                                                teamData.map((teamData, index) => {
                                                    return (
                                                        <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                                                            <div className="card card-lg card-body align-items-center rounded-0">
                                                                {
                                                                    teamData.team_tag ?
                                                                    (
                                                                    <React.Fragment>
                                                                        <span className="badge badge-primary badge-top rounded-0">{teamData.team_tag}</span>
                                                                    </React.Fragment> ) : null
                                                                }
                                                                
                                                                <img src={teamData.person_image.url ? process.env.GRAPHIMAGEURL + teamData.person_image.url : "/assets/images/female-2.jpg" } alt="female 2" className="avatar avatar-xlg mb-3" />
                                                                <h5 className="mb-0">{teamData.full_name}</h5>
                                                                <span>{teamData.position_text}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }  {
                                                teamData.length === 0 &&(
                                                        <h5 className="text-center mb-4">There is no member in this team.</h5>
                                                )}                 
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default Teams;