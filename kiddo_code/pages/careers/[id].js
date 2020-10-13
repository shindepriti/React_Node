import React, {Component} from 'react';
import Router from 'next/router';
import Layout from '../../components/Layout';
//import AboutPage from '../../components/AboutPage';
/*import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
  } from "react-share";*/
import {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
} from "react-share";

class Careerpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position_title: "",
            position_location: "",
            position_description: ""
        };
    }
    componentDidMount(){
      
        let id = Router.query.id;
        let splitData = id.split('-');
        console.log(splitData);
        var query = `
                    query ActivityById($id: ID!){
                        careerPositions(where:{id:$id}){
                            id,
                            position_location,
                            position_type,
                            position_title,
                            position_slug,
                            position_show,
                            position_description
                        }
                    }
                    `;
        var variables = {
            "id": Number(splitData[0])
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
            if (response.data.careerPositions) {
                glanceData = response.data.careerPositions[0];

                //console.log(glanceData); 
                this.setState({
                    position_title: glanceData.position_title,
                    position_location: glanceData.position_location,
                    position_description: glanceData.position_description
                });
            }
            
        });
    }
    render(){
        const { position_title, position_location, position_description } = this.state;
        return(
            <>
                <Layout>
                    <section></section>
                    <section className="pt-0">
                        <div className="container">
                        <div className="decoration-wrapper">
                            <div className="decoration top right d-none d-md-block" data-jarallax-element="100 100">
                                <svg width="301" height="326" viewBox="0 0 301 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.1">
                                        <path d="M163.994 308.223C170.799 306.366 177.637 308.974 185.058 304.165C182.55 302.394 180.885 300.21 179.139 300.142C152.324 299.022 130.889 283.653 107.66 273.183C93.3326 266.727 79.3004 259.598 65.3752 252.314C59.0631 249.007 53.0205 244.996 47.4059 240.6C35.2267 231.056 33.5834 220.092 39.8399 206.009C48.2746 187.028 59.8846 170.119 72.4447 153.884C88.775 132.779 105.075 111.525 123.027 91.8236C136.803 76.7032 153.3 64.1093 168.214 49.9883C180.718 38.1493 194.031 27.4557 209.001 19.0269C218.227 13.8366 227.689 8.87365 237.493 4.93162C253.455 -1.48973 268.793 2.79118 280.155 15.7325C281.507 17.2767 282.812 18.8681 284.241 20.3479C298.736 35.3611 305.549 53.3213 306.259 74.1896C306.678 86.1314 308.942 98.009 310.286 109.925C311.206 118.088 312.015 126.264 312.794 134.444C314.347 150.817 315.776 167.198 317.398 183.567C320.159 211.543 322.598 239.592 320.557 267.671C319.671 279.853 317.154 292.176 313.478 303.827C308.762 318.732 298.569 325.561 280.779 325.171C252.48 324.545 223.987 323.361 196.193 316.669C185.417 314.061 174.727 311.05 163.994 308.223ZM214.252 235.928C215.056 235.667 215.865 235.405 216.674 235.139C216.481 234.624 216.297 233.672 216.088 233.664C215.262 233.629 214.431 233.9 213.605 234.058C213.789 234.586 213.973 235.113 214.252 235.928Z" fill="#FF8E88"/>
                                    </g>
                                    <path d="M73.32 136.866C73.459 135.627 72.664 135.254 71.906 134.767C70.867 134.099 70.59 133.275 71.031 132.343C71.222 131.943 71.58 131.522 71.969 131.333C73.746 130.471 76.209 131.201 77.276 132.857C77.698 133.515 77.764 134.256 77.266 134.875C76.352 136.012 75.258 136.898 73.32 136.866Z" fill="#3755BE"/>
                                    <path d="M33.5251 179.624C32.8901 179.353 32.2261 179.132 31.6251 178.799C30.5961 178.23 29.8591 177.434 29.9791 176.133C30.0831 174.999 31.0281 174.036 32.3131 173.763C32.5471 173.713 32.7801 173.654 33.0181 173.626C34.1571 173.491 34.8851 173.908 35.2481 174.97C35.5371 175.812 35.6291 176.683 35.3671 177.56C35.1191 178.387 34.8261 178.715 33.5251 179.624Z" fill="#3755BE"/>
                                    <path d="M3.47102 166.291C3.28302 166.203 2.79302 166.131 2.59002 165.852C1.75002 164.696 0.916028 163.5 0.709028 162.045C0.582028 161.166 1.12103 160.387 1.85003 160.157C2.72303 159.883 3.61003 159.738 4.24803 160.603C4.86303 161.434 5.44502 162.293 5.98002 163.177C6.42302 163.907 6.49802 164.748 5.98002 165.444C5.43202 166.184 4.63102 166.554 3.47102 166.291Z" fill="#3755BE"/>
                                    <path d="M67.549 150.485C67.445 150.723 67.2249 151.227 67.0039 151.733C66.5509 152.777 64.135 153.136 63.51 152.036C63.164 151.426 62.795 150.811 62.571 150.152C62.307 149.37 62.7659 148.483 63.5589 148.273C64.3169 148.073 65.121 147.968 65.907 147.969C67.271 147.971 67.865 148.802 67.549 150.485Z" fill="#3755BE"/>
                                    <path d="M113.014 189.365C112.778 190.276 112.307 190.953 111.313 191.153C110.467 191.322 109.659 191.006 109.295 190.257C108.984 189.62 108.719 188.959 108.49 188.289C108.24 187.563 108.351 186.878 108.888 186.289C109.443 185.68 110.148 185.631 110.87 185.81C112.268 186.154 113.34 187.965 113.014 189.365Z" fill="#3755BE"/>
                                    <path d="M77.145 165.633C77.024 165.16 77.006 164.559 76.731 164.115C76.016 162.961 76.557 162.14 77.311 161.351C77.944 160.688 78.721 160.651 79.52 160.996C80.547 161.439 81.223 162.154 81.262 163.35C81.305 164.698 80.594 165.668 79.283 165.959C78.568 166.118 77.859 166.126 77.145 165.633ZM79.16 162.699C79.01 162.366 78.969 162.112 78.818 161.978C78.531 161.719 78.056 161.958 77.957 162.434C77.918 162.622 78.053 162.848 78.107 163.057C78.438 162.945 78.768 162.833 79.16 162.699Z" fill="#3755BE"/>
                                    <path d="M20.1408 130.246C19.9418 131.296 19.8318 132.242 19.5608 133.14C19.4088 133.64 19.0378 134.103 18.6738 134.501C18.2758 134.938 17.7188 135.051 17.1448 134.842C16.5428 134.624 16.3168 134.108 16.2898 133.534C16.2688 133.065 16.3778 132.591 16.4228 132.119C16.4678 131.647 16.5828 131.164 16.5228 130.705C16.4528 130.163 16.1598 129.589 16.8118 129.254C17.4618 128.92 18.1768 128.803 18.8448 129.224C19.2418 129.474 19.5878 129.804 20.1408 130.246Z" fill="#3755BE"/>
                                    <path d="M23.2341 153.617C24.1191 154.15 24.435 154.943 24.58 155.827C24.73 156.751 24.307 157.664 23.58 158.051C22.793 158.471 22.0041 158.37 21.3551 157.842C20.8821 157.457 20.466 156.928 20.201 156.378C19.627 155.183 20.1251 154.19 21.4371 153.849C22.0351 153.692 22.6721 153.685 23.2341 153.617Z" fill="#3755BE"/>
                                    <path d="M53.8851 165.897C53.8231 166.159 53.7891 166.315 53.7461 166.468C53.3441 167.939 52.426 168.184 51.365 167.092C51.033 166.75 50.7011 166.395 50.4451 165.996C49.6231 164.715 50.181 163.247 51.636 162.789C52.845 162.409 53.9041 163.084 53.9821 164.336C54.0181 164.889 53.9161 165.448 53.8851 165.897Z" fill="#3755BE"/>
                                    <path d="M96.3362 151.503C96.6952 152.848 96.9922 153.957 97.3112 155.149C96.9012 155.556 96.5022 156.054 96.0062 156.418C95.2012 157.006 94.0222 156.582 93.6902 155.627C93.3722 154.713 93.1762 153.817 93.8382 152.919C94.4672 152.063 95.0642 151.254 96.3362 151.503Z" fill="#3755BE"/>
                                    <path d="M107.16 170.977C106.738 170.191 106.299 169.37 105.873 168.573C106.926 166.661 107.978 166.167 109.469 166.851C110.057 167.121 110.299 167.578 110.153 168.206C109.954 169.069 109.678 169.917 108.983 170.515C108.492 170.936 107.914 171.206 107.16 170.977Z" fill="#3755BE"/>
                                    <path d="M45.7482 141.597C45.4982 142.829 43.6893 143.897 42.5393 143.522C42.3933 143.474 42.2343 143.395 42.1313 143.285C41.5783 142.694 41.5333 140.984 42.0393 140.363C42.7253 139.521 44.2422 139.272 45.0762 139.929C45.6042 140.345 45.8182 140.953 45.7482 141.597Z" fill="#3755BE"/>
                                    <path d="M62.6021 188.477C60.2951 188.504 60.295 188.504 60.123 187.021C60.377 186.641 60.6561 186.924 60.9351 186.979C61.4471 187.077 61.8301 186.915 62.1091 186.436C62.6521 185.509 62.67 185.519 63.929 185.09C64.077 185.41 64.3251 185.735 64.3701 186.085C64.4811 186.948 64.5461 187.823 64.5461 188.693C64.5461 189.368 64.2671 189.916 63.3231 190.045C63.0881 189.534 62.8401 188.996 62.6021 188.477Z" fill="#3755BE"/>
                                    <path d="M84.02 182.015C84.163 182.758 83.719 183.269 83.211 183.604C82.498 184.074 81.695 184.424 80.899 184.747C80.362 184.965 79.821 184.413 79.895 183.802C80.032 182.665 80.752 181.943 81.704 181.486C82.557 181.075 83.383 181.234 84.02 182.015Z" fill="#3755BE"/>
                                </svg>
                            </div>
                        </div>
                        <div class="align-items-center social-share-icons">
                            <span class="text-small mb-3 d-block text-uppercase mr-0">Share</span>
                            <div>
                              <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                <i class="fa fa-twitter"></i>

                              </a>
                              <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                <i class="fa fa-facebook-official"></i>

                              </a>
                              <a href="#" class="btn btn-round btn-gray rounded-circle mx-1">
                                <i class="fa fa-linkedin-square"></i>

                              </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row justify-content-center">
                                    <div className="col-xl-7 col-lg-8">
                                        <span className="text-muted"></span>
                                        <h1 className="my-2">{position_title ? position_title : ""}</h1>
                                        <div>{position_location ? position_location : ""}</div>
                                        <a href="#" className="btn btn-primary rounded-0 mt-3">Apply Now</a>
                                        <hr />
                                        <article className="article">
                                            <p className="lead" dangerouslySetInnerHTML={{ __html: position_description }} ></p>
                                        </article>
                                        {/*
                                        <hr />
                                        <h6>Hiring Policy</h6>
                                        <small>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia
                                        deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
                                        possimus, omnis voluptas assumenda est, omnis dolor repellendus.</small>
                                        */}
                                        <hr />
                                        <a href="#" className="btn btn-primary btn-blue rounded-0">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </Layout>
            </>
        )
    }
}

export default Careerpost;