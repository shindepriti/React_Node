import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';

class Instructors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInstructorData: []
    };
  }

  componentDidMount() {
    let id = Router.query.id;
    let splitData = id.split('-');
    var query = `
        query {
              courseInstructors{
                id,
                instructor_name,
                instructor_department,
                instructor_image{
                  url,
                  name
                }
              }
          }`;
    var variables = {
      "id": Number(splitData[0])
    }
    fetch(process.env.GRAPHURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
      .then(response => response.json())
      .then((response) => {
        // console.log(response.data);
        let courseInstructor = response.data.courseInstructors;
        // console.log(courseInstructor); 
        this.setState({
          courseInstructorData: courseInstructor ? courseInstructor : null,
        });
      });

    //console.log(homeBannerData);
  }
  render() {
    const { courseInstructorData } = this.state;
    return (
      <>
        <section className="pb-0 instructors-sec">
          <div className="container">
            <div className="row mb-4">
              <div className="col">
                <h2>Course instructors</h2>
              </div>
            </div>
            <div className="row">
              {
                courseInstructorData.length > 0 &&
                courseInstructorData.map((courseInstructorDataGet, index) => {
                  var img = courseInstructorDataGet ? process.env.GRAPHIMAGEURL + courseInstructorDataGet.instructor_image[0].url : "/assets/images/female-2.jpg";
                  return (
                    <div key={"instructor_"+index} className="col-sm-6 col-lg-4 d-flex align-items-center mb-5" data-aos="fade-up" data-aos-delay="100">
                      <img src={img} alt="Benjamin Cameron" className="avatar avatar-xlg mr-3" />
                      <div>
                        <h5 className="mb-0">{courseInstructorDataGet.instructor_name}</h5>
                        <span>{courseInstructorDataGet.instructor_department}</span>
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

export default Instructors;