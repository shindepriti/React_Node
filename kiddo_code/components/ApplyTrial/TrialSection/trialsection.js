
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class TrialSection extends Component {
    constructor(props) {
      super(props);
      this.state = ({
        parentSection: [],
        studentSection: [],
        clickevent: 'parent'
      })
    }

    componentDidMount() {
      this.getParentTrialSection();
      this.getStudentTrialSection();
    }

    changeTab = (value) => {
      this.setState({
        clickevent: value
      })
    }

    getParentTrialSection() {
      var query = `
                    query ActivityById($id: ID!){
                        trialsessions(where:{id:$id}){
                          trialsessiontimeline{
                            id,
                            trial_time,
                            trial_title,
                            trial_description
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
                let blogData = response.data.trialsessions[0];
                //console.log(homeBanner);
                this.setState({
                  parentSection: blogData.trialsessiontimeline
                });
            });
    }

    getStudentTrialSection() {
      var query = `
                    query ActivityById($id: ID!){
                        trialsessions(where:{id:$id}){
                          trialsessiontimeline{
                            id,
                            trial_time,
                            trial_title,
                            trial_description
                          }
                        }
                    }
                    `;
        var variables = {
            "id": 2
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let blogData = response.data.trialsessions[0];
                //console.log(homeBanner);
                this.setState({
                  studentSection: blogData.trialsessiontimeline
                });
            });
    }

    render(){
      const { clickevent, parentSection, studentSection } = this.state;
        return (
            <>
                <section className="o-hidden history-wrap-sec xlight-gray-bg">
                  <div className="container">
                    <div className="row mb-4">
                      <div className="col">
                        <h2 className="text-center">Trial session timeline</h2>
                      </div>
                    </div>
                    <div className="row justify-content-left mb-0 cat-listing-row">
                      <div className="col-xl-12 d-flex align-items-center justify-content-center mb-3">
                        <ul className="nav justify-content-left mb-6 timeline-wrap" role="tablist">
                          <li className="nav-item mx-0" onClick={() => this.changeTab('parent')}>
                            <a className="nav-link active rounded-0" href="#parents" data-toggle="tab" role="tab" aria-controls="parents" aria-selected="true">
                              Parents  
                            </a>
                          </li>
                          <li className="nav-item mx-0" onClick={() => this.changeTab('student')}>
                            <a className="nav-link rounded-0" href="#students" data-toggle="tab" role="tab" aria-controls="students" aria-selected="false">
                              Students                          
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row o-hidden o-lg-visible">
                      <div className="tab-content w-100">
                        {
                          clickevent === 'parent' &&
                          <div className="tab-pane fade show active" id="parents" role="tabpanel" aria-labelledby="parents">
                            <div className="col d-flex flex-column align-items-center">
                              <ol className="process-vertical">
                                {
                                    parentSection.length > 0 &&
                                    parentSection.map((parentData, index) => {
                                      return (
                                        <li key={index} data-aos="fade-left" >
                                          <div className="process-circle bg-primary"></div>
                                          <div>
                                            <span className="text-xsmall text-primary"> {parentData.trial_time} </span>
                                            <h5 className="mb-0">{parentData.trial_title}</h5>
                                            <p className="opacity-80">{parentData.trial_description}</p>
                                          </div>
                                        </li>
                                      )
                                    })
                                }
                              </ol>
                            </div>
                          </div>
                        }
                        {
                          clickevent === 'student' &&
                          <div className={clickevent === 'student' ? "tab-pane fade show active": "tab-pane fade"} id="students" role="tabpanel" aria-labelledby="students">
                            <div className="col d-flex flex-column align-items-center">
                              <ol className="process-vertical">
                                {
                                  studentSection.length > 0 &&
                                  studentSection.map((parentData, index) => {
                                    return (
                                      <li key={index} data-aos="fade-left" >
                                        <div className="process-circle bg-primary"></div>
                                        <div>
                                          <span className="text-xsmall text-primary"> {parentData.trial_time} </span>
                                          <h5 className="mb-0">{parentData.trial_title}</h5>
                                          <p className="opacity-80">{parentData.trial_description}</p>
                                        </div>
                                      </li>
                                    )
                                  })
                                }    
                              </ol>
                            </div>
                          </div>
                        }
                        
                      </div>
                    </div>
                  </div>
                </section>
            </>
        )
    }
}
export default TrialSection;