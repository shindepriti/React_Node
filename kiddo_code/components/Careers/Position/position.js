
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionData: []
        };
    }

    componentDidMount() {
        var query = `
                    query {
                        careerPositions(where:{position_show:true}){
                            id,
                            position_location,
                            position_type,
                            position_title,
                            position_slug,
                            position_show
                        }
                    }
                    `;
        
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let glanceData = [];
                if (response.data.careerPositions) {
                    glanceData = response.data.careerPositions;
                }
                //console.log(glanceData); 
                this.setState({
                    positionData:glanceData
                });
            });

        //console.log(homeBannerData);
    }
    render(){
        const { positionData } = this.state;
        return (
            <>
                <section>
                    <div className="container">
                        <h2 className="h1 text-left font-weight-medium">Open Positions</h2>
                        <div className="row no-gutters d-none d-md-flex bg-white py-3">
                            <div className="col-xl-7 col-md-6">
                                <span className="h6 mb-0 text-muted">POSITION  </span>
                            </div>
                            <div className="col">
                                <span className="h6 mb-0 text-muted">TYPE </span>
                            </div>
                            <div className="col">
                                <span className="h6 mb-0 text-muted">LOCATION </span>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div className="list-group list-group-flush">
                                {
                                    positionData.length > 0 &&
                                    positionData.map((positiondetail, index) => {
                                        return (
                                            <a key={index} href={`careers/${positiondetail.id}-${positiondetail.position_slug}`} className="list-group-item list-group-item-action row no-gutters align-items-center py-3">
                                                <div className="col-xl-7 col-md-6">
                                                    <h5 className="mb-0">{positiondetail.position_title}</h5>
                                                </div>
                                                <div className="col-md">
                                                    <span>{positiondetail.position_type}</span>
                                                </div>
                                                <div className="col-md">
                                                    <span>{positiondetail.position_location}</span>
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                                
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <span>Didn't see your dream job? <a href="#" className="text-blue">Drop us your resume</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Position;