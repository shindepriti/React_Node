
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Faq extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        
    }
    render(){
        
        return (
            <>
              <section className="faq-sec">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12">
                      <h3 className="h2 text-center mb-6">Frequently Asked Questions</h3>
                      <div className="my-4">
                        <div className="card mb-2 card-sm card-body hover-shadow-sm" data-aos="fade-up" data-aos-delay="NaN">
                          <div data-target="#panel-1" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="panel-1">
                            <span className="h6 mb-0">How much is the cost for a trial class?</span>
                            <svg className="rotate-wrap" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.25V18.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.75 12H5.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                          </div>
                          <div className="collapse" id="panel-1">
                            <div className="pt-3">
                              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                            </div>
                          </div>
                        </div>
                        <div className="card mb-2 card-sm card-body hover-shadow-sm" data-aos="fade-up" data-aos-delay="NaN">
                          <div data-target="#panel-2" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="panel-2">
                            <span className="h6 mb-0">Why do parents have to attend the trial session?</span>
                            <svg className="rotate-wrap" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.25V18.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.75 12H5.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                          </div>
                          <div className="collapse" id="panel-2">
                            <div className="pt-3">
                              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                            </div>
                          </div>
                        </div>
                        <div className="card mb-2 card-sm card-body hover-shadow-sm" data-aos="fade-up" data-aos-delay="NaN">
                          <div data-target="#panel-3" className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="panel-2">
                            <span className="h6 mb-0">I have 3 children and want all of them to have a trial session. Can I schedule my children separately?</span>
                            <svg className="rotate-wrap" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.25V18.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.75 12H5.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                          </div>
                          <div className="collapse" id="panel-3">
                            <div className="pt-3">
                              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-6">
                        <span>Still have questions? <a href="#" data-toggle="modal" data-target="#ask-modal">Get in
                        touch</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
        )
    }
}
export default Faq;