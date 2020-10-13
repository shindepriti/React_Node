import React, {Component} from 'react';
import Layout from '../components/Layout';

class Legal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policy_description: "",
            policy_version: ""
        };
    }
    componentDidMount(){
      
        var query = `
                    query ActivityById($id: ID!){
                        privacyPolicies(where:{id:$id}){
                            id,
                            policy,
                            version
                        }
                    }
                    `;
        var variables = {
            "id": 1
        };

        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        })
        .then(response => response.json())
        .then((response) => {
            //console.log(response);
            let glanceData = [];
            if (response.data.privacyPolicies) {
                glanceData = response.data.privacyPolicies[0];
                //console.log(glanceData); 
                this.setState({
                    policy_description: glanceData.policy,
                    policy_version: glanceData.version
                });
            }
            
        });
    }
    render(){
        const { policy_description, policy_version } = this.state;
        return(
            <>
                <Layout>
                    <React.Fragment>
                        <section></section>
                        <section className="pt-0">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="row justify-content-center">
                                            <div className="col-xl-7 col-lg-8">
                                                <span className="text-muted">Updated Yesterday</span>
                                                <h1 className="my-2">Privacy Policy</h1>
                                                <div>{policy_version ? policy_version : ""}</div>
                                                <article className="article pt-5 pb-3">
                                                    <p className="lead" dangerouslySetInnerHTML={{ __html: policy_description }} ></p>
                                                </article>
                                                <hr />
                                                <h6>Fine Print</h6>
                                                <small>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</small><br/><br/>
                                                <small>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
                </Layout>
            </>
        )
    }
}

export default Legal;