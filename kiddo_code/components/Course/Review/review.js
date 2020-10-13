import React, { Component } from 'react';
import  { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Pagination from 'react-js-pagination';
import moment from 'moment';
const publicIp = require('public-ip');
const fetch = require('isomorphic-fetch');

function dayDifference(text) {
  let parsedDate = moment.utc(text);
  let now = moment.utc();
  let differenceInDays = now.diff(parsedDate,'days');
  //console.log(differenceInDays);
  if(differenceInDays<30 && differenceInDays>1){
      return `${differenceInDays} days ago`;
  }else if(differenceInDays == 1){
      return 'yesterday';
  }else if(differenceInDays == 0){
      // Calculate hours
      let differenceInHours = now.diff(parsedDate,'hours');
      //console.log(differenceInHours);
      if(differenceInHours > 0) {
          return `${differenceInHours} hours ago`;
      }else {
          let differenceInMinutes = now.diff(parsedDate,'minutes');
          //console.log(differenceInMinutes);
          if(differenceInMinutes>1){
              return `${differenceInMinutes} mins ago`;
          }else {
              let differenceInSec = now.diff(parsedDate,'seconds');
              //console.log(differenceInSec);
              return `${differenceInSec} secs ago`;
          }
      }
  }else{
      return parsedDate.format('ddd, DD MMM YYYY HH:mm:ss')+' GMT';
  }
}

function setRating(ratingValue) {
  let rating = 0;
  if (ratingValue === 'ONE') {
    rating = 1;
  } else if (ratingValue === 'TWO') {
    rating = 2;
  } else if (ratingValue === 'THREE') {
    rating = 3;
  } else if (ratingValue === 'FOUR') {
    rating = 4;
  } else if (ratingValue === 'FIVE') {
    rating = 5;
  }
  return rating;
}

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: [],
      allReviewData: [],
      originalReviewData: [],
      allDbReviewData: [], 
      openModal: false,
      activePage: 1,
      staticNumberOfRow: '10',
      ipAddress:''
    };
  }

  async componentDidMount() {
    let ipAddress = await publicIp.v4();
    
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'authorization': `Bearer nc9ZZ50ddngaz8QxGaO5BR3dYzzjKaJ5XtuYHiOD9kO53gHz1K3ngPMv9gRYWHh1` },
    };
    return fetch('https://kapi.kidocode.com/api/v1/kweb/business/review', requestOptions)
      .then(response => response.json())
      .then((response) => {
        //console.log('review', response)
        if (response.status) {
          this.getDbReviewData(ipAddress);
          this.setState({
            reviewData: response.reviews,
            allReviewData: response.reviews,
            ipAddress: ipAddress
          });
        }
      })
  }

  getDbReviewData(ipAddress) {
    var query = `
                  query ActivityById($webipaddress: String!){
                    webReviews(where:{webipaddress:$webipaddress}){
                      id
                      webreviewname
                      webipaddress
                      webreviewlike
                    }
                  }
                    `;
        var variables = {
          "webipaddress": ipAddress
        }
        fetch(process.env.GRAPHURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
              if(response.data && response.data.webReviews.length > 0) {
                this.setState({
                  allDbReviewData:response.data.webReviews
                });
              }
            });
    
  }

  getWebReportDetail = async (reviewerName) => {
    var query = `
                  query ActivityById($webreviewname: String!,$webipaddress: String!){
                    webReviews(where:{webreviewname:$webreviewname,webipaddress:$webipaddress}){
                      id
                      webreviewname
                      webipaddress
                      webreviewlike
                    }
                  }
                    `;
        var variables = {
          "webreviewname": reviewerName,
          "webipaddress": this.state.ipAddress
        }
        return fetch(process.env.GRAPHURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
              return response.data;
            });
    
  }

  changeReportUp = async(reviewerName, reviewerFlag) => {
    let checkReviewAvailable = await this.getWebReportDetail(reviewerName);
    if (checkReviewAvailable.webReviews.length === 0) {
      var query = `
              mutation {
                createWebReview(input: { data: { webreviewname: "${reviewerName}", webipaddress: 
                "${this.state.ipAddress}", webreviewlike: ${reviewerFlag} } }) {
                  webReview{
                    webreviewname
                    webipaddress
                    webreviewlike
                  }
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
            this.getDbReviewData(this.state.ipAddress);
          });
    } else {
      let webViewRecord = checkReviewAvailable.webReviews[0];
      let query = `
              mutation {
                updateWebReview(input: { where: { id: ${webViewRecord.id} } data: { webreviewname: "${reviewerName}", webipaddress: 
                "${this.state.ipAddress}", webreviewlike: ${reviewerFlag} } }) {
                  webReview{
                    webreviewname
                    webipaddress
                    webreviewlike
                  }
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
            this.getDbReviewData(this.state.ipAddress);
          });
    }
    
  }

  changeReportDown = async(reviewerName, reviewerFlag) => {
    let checkReviewAvailable = await this.getWebReportDetail(reviewerName);
    //console.log("checkReviewAvailable", checkReviewAvailable);
    if (checkReviewAvailable.webReviews.length === 0) {
      let query = `
              mutation {
                createWebReview(input: { data: { webreviewname: "${reviewerName}", webipaddress: 
                "${this.state.ipAddress}", webreviewlike: ${reviewerFlag} } }) {
                  webReview{
                    webreviewname
                    webipaddress
                    webreviewlike
                  }
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
            this.getDbReviewData(this.state.ipAddress);  
          });
    } else {
      let webViewRecord = checkReviewAvailable.webReviews[0];
      let query = `
              mutation {
                updateWebReview(input: { where: { id: ${webViewRecord.id} } data: { webreviewname: "${reviewerName}", webipaddress: 
                "${this.state.ipAddress}", webreviewlike: ${reviewerFlag} } }) {
                  webReview{
                    webreviewname
                    webipaddress
                    webreviewlike
                  }
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
            this.getDbReviewData(this.state.ipAddress);
          });
    }
    
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {
    const { reviewData, allReviewData, activePage, staticNumberOfRow, allDbReviewData } = this.state;
    //console.log('reviewData', reviewData)
    return (
      <>
        <section className="review-section">
          <div className="container">
            <h2 className="mb-4">Review</h2>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {
                    reviewData.length > 0 &&
                    reviewData.slice(0,2).map((review, index) => {
                      let reviewFlag = allDbReviewData.find(item => item.webreviewname === review.reviewerName && item.webipaddress === this.state.ipAddress);
                      return (
                        <div key={index} className="comment-sec mt-4 pt-4 border-top">
                          <h5>{review.reviewerName ? review.reviewerName : ''}</h5>
                          <div className="d-flex">
                            <div className="d-flex">
                              <StarRatings
                                rating={setRating(review.starRating)}
                                starRatedColor="#ffc107"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            </div>
                            <h6 className="mb-0 opacity-80 font-weight-normal ml-2">{dayDifference(review.createTime)}</h6>
                          </div>
                          <p className="h6 h5 font-weight-normal mt-2">{review.comment ? review.comment : ''}</p>
                          <h6 className="font-weight-normal opacity-60">Was this helpful?</h6>
                          <div className="d-flex align-items-center">
                            <div className="review-btn" onClick={() => this.changeReportUp(review.reviewerName, true)}><span><i className={reviewFlag && reviewFlag.webreviewlike === true ? "fa fa-thumbs-up cornflowerblue" : "fa fa-thumbs-up"}></i></span></div>
                            <div className="review-btn" onClick={() => this.changeReportDown(review.reviewerName, false)}><span><i className={reviewFlag && reviewFlag.webreviewlike === false ? "fa fa-thumbs-down cornflowerblue" : "fa fa-thumbs-down ffgdgdfgdfg"}></i></span></div>
                            <h6 className="ml-2 mb-0 opacity-60">Report</h6>
                          </div>
                        </div>
                      )
                    })
                  }
                  <a href="#" className="mt-4 d-inline-block" onClick={this.handleModal.bind(this)}>Show more <span className="ml-1"><i className="fa fa-angle-down"></i></span></a>
                </div>
                <div className="col-md-6 text-light p-2 pb-5 pl-4">
                  <div className="p-5" style={{ backgroundImage: `url(/assets/images/img21.jpg)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <h2>Ready to go long-term?</h2>
                    <h5 className="font-weight-light">Check out our degrees.</h5>
                    <a href="#" className="btn btn-lightblue text-light rounded-0 mt-0">Explore degree</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal size="lg" show={this.state.openModal} onHide={this.handleModal.bind(this)} animation={true}>
          <Modal.Body>
              <div className="container">
                <h2 className="mb-4">Review</h2>
                <div className="col-md-12">
                  {
                    allReviewData.length > 0 &&
                    allReviewData.slice(
                      ((activePage - 1) * staticNumberOfRow),
                      ((activePage - 1) + 1) * staticNumberOfRow
                    ).map((review, index) => {
                      let reviewFlag = allDbReviewData.find(item => item.webreviewname === review.reviewerName && item.webipaddress === this.state.ipAddress);
                      return (
                        <div key={index} className="comment-sec">
                          <h5>{review.reviewerName ? review.reviewerName : ''}</h5>
                          <div className="d-flex">
                            <div className="d-flex">
                              <StarRatings
                                rating={setRating(review.starRating)}
                                starRatedColor="#ffc107"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            </div>
                            <h6 className="mb-0 opacity-80 font-weight-normal ml-2">{dayDifference(review.createTime)}</h6>
                          </div>
                          <p className="h6 h5 font-weight-normal mt-2">{review.comment ? review.comment : ''}</p>
                          <h6 className="font-weight-normal opacity-60">Was this helpful?</h6>
                          <div className="d-flex align-items-center">
                            <div className="review-btn" onClick={() => this.changeReportUp(review.reviewerName, true)}><span><i className={reviewFlag && reviewFlag.webreviewlike === true ? "fa fa-thumbs-up cornflowerblue" : "fa fa-thumbs-up"}></i></span></div>
                            <div className="review-btn" onClick={() => this.changeReportDown(review.reviewerName, false)}><span><i className={reviewFlag && reviewFlag.webreviewlike === false ? "fa fa-thumbs-down cornflowerblue" : "fa fa-thumbs-down ffgdgdfgdfg"}></i></span></div>
                            <h6 className="ml-2 mb-0 opacity-60">Report</h6>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="row justify-content-center">
                  <div className="pagination-detail">
                    <Pagination
                      hideFirstLastPages
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.staticNumberOfRow}
                      itemClass="page-item"
                      linkClass="page-link"
                      totalItemsCount={allReviewData.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Review;