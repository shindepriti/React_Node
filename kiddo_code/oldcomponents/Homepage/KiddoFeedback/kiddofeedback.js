import React, {Component} from 'react';
    import Flickity from 'react-flickity-component';
    const flickityOptions = {
        initialIndex: 0,
        accessibility: true,
        pageDots: false,
        wrapAround: true
    }

    const fetch = require('isomorphic-fetch');

    class KiddoFeedback extends Component {
         constructor(props) {
            super(props);
            this.state = {
               kiddoData: [],
            };
        }

        componentDidMount() {
            var query = `query {
                      homeKidoFamilies{
                        id,
                        name,
                        department,
                        description,
                        icon{
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
                    let finalResponse = response.data.homeKidoFamilies;
                    this.setState({
                        kiddoData: finalResponse
                    });
                });

            
        }


    
    render(){
        const { kiddoData } = this.state;
        return (
            <>
                <section className="o-hidden has-divider testimonial-wrap-cls">
                    <div className="container pb-4">
                        <div className="row justify-content-center text-center">
                            <div className="col-xl-8 col-lg-9">
                                <span className="new-tag mb-2 d-inline-block bg-blue">feedback</span>
                                <h2 className="mx-xl-6 font-weight-bold">{this.state.feedback_title ? this.state.feedback_title : ""}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="controls-light arrows-inside">

                             {
                                kiddoData.length > 0 &&
                                <Flickity
                                    className={'carousel-cell'} // default ''
                                    elementType={'div'} // default 'div'
                                    options={flickityOptions} // takes flickity options {}
                                    disableImagesLoaded={false} // default false
                                    reloadOnUpdate={true} // default false
                                    static={true} // default false
                                >

                            {
                                kiddoData.length > 0 &&
                                kiddoData.map((kiddoDataGet, index) => {
                                    return (
                                        
                                        <div key={index} className="carousel-cell col-xl-3 col-lg-4 col-md-5 col-9 pb-1">
                                            <div className="card card-body rounded-0">
                                                <div className="mb-3 mb-md-4">
                                                    <img src="http://54.255.146.92/wp-content/uploads/2020/06/circus.png" alt="Lucy Ford" className="avatar avatar-lg"/>
                                                </div>
                                                <div className="flex-grow-1 pt-md-3">
                                                    <h4>{kiddoDataGet.description}</h4>
                                                </div>
                                                <div className="avatar-author d-block mt-2">
                                                    <h6>{kiddoDataGet.name}</h6>
                                                    <span>{kiddoDataGet.department}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                              </Flickity>
                        }
                    </div>
                    <div className="divider">
                        <svg width="100%" height="96px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"/>
                        </svg>
                    </div>
                </section>
            </>
        )
    }
}

export default KiddoFeedback;