
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Activity extends Component {
    constructor(props) {
      super(props);
      this.state = {
        whywerock: []
      };
    }

    componentDidMount() {
      var query = `
            query ActivityById($id: ID!){
                weRocks(where:{id:$id}){
                    id,
                    WhyRock{
                        id,
                        rock_icon{
                            name,
                            url
                        },
                        rock_title,
                        rock_description
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
        let glanceData = response.data.weRocks[0];
        //console.log(homeBanner); 
        this.setState({
            whywerock:glanceData.WhyRock
        });
      });

      //console.log(homeBannerData); 
    }
    render(){
      const { whywerock } = this.state;
        return (
            <>
              <section className="why-we-rock-wrap activities-wrap">
                <div className="container">
                  <div className="row mb-4 aos-init aos-animate" data-aos="fade-up">
                    <div className="col">
                        <h2 className="text-center">What are the activities</h2>
                    </div>
                  </div>
                  <div className="row">
                    {
                      whywerock.length > 0 &&
                      whywerock.map((rockData, index) => {
                        return (
                          <div key={index} className="col-12 col-md mb-3 mb-md-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                            <div>
                              <img className="mobile-none" src={process.env.GRAPHIMAGEURL + rockData.rock_icon.url} />
                              <div className="mt-3 why-we-rock-details w-100" style={{backgroundImage: `url(${process.env.GRAPHIMAGEURL + rockData.rock_icon.url})`}}>
                                  <h5>{rockData.rock_title}</h5>
                                  <p className="mobile-none">{rockData.rock_description}</p>
                              </div>
                            </div>
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
export default Activity;