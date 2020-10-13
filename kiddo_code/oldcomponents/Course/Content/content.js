import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      courseBanners: []
    };
  }

  componentDidMount() {
    let id = Router.query.id;
    let splitData = id.split('-');
    var query = `
        query ActivityById($id: ID!){
          products(where:{id:$id}){
              id,
              product_name,
              product_introduction,
              product_hours,
              product_type{
                id,
                product_type
              },
              contents{
                id,
                course_content,
                course_details{
                  id,
                  course_text,
                  course_time
                }
              },
              course_content_banners{
                id,
                course_content_banner{
                  course_content_title,
                  course_content_description,
                  button_text,
                  course_content_image{
                    name,
                    url
                  }
                }
              }
          }
      }
                    `;
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
        let productData = response.data.products[0];
        this.setState({
          contents: productData.contents ? productData.contents : '',
          courseBanners: productData.course_content_banners ? productData.course_content_banners : '',
        });
      });

    //console.log(homeBannerData);
  }
  render() {
    const { contents, courseBanners } = this.state;
    return (
      <>
        <section className="fascinates-section learn-section">
          <div className="container">
            <div className="row justify-content-center text-center mb-6">
              <div className="col-xl-8 col-lg-9">
                <h2 className="mx-xl-6 font-weight-bold">Course content</h2>
              </div>
            </div>
            <div className="row justify-content-left courses-content-cls">
              <div className="col-md-7 pr-6">
                {
                  contents.length > 0 &&
                  contents.map((content, index) => {
                    return (
                      <div className="border-bottom pb-2 mb-2 w-100">
                        <div data-target={"#panel-" + index} className="accordion-panel-title" data-toggle="collapse" role="button" aria-expanded="true">
                          <span className="h5 mb-1 w-100 text-dark">{content.course_content ? content.course_content : ''} <i className="fa fa-angle-down"></i></span>
                        </div>
                        <div className="collapse" id={"panel-" + index}>
                          <div className="pt-2">
                            <p className="mb-0">
                              {
                                content.course_details &&
                                content.course_details.map((detail, index) => {
                                  return (
                                    <div className="course-content mb-2">
                                      <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 18.0166C21.54 18.0164 21.3324 17.9722 21.1406 17.8867C21.096 17.8669 21.0535 17.8427 21.0136 17.8145L17.1366 15.0855C16.9399 14.9471 16.7795 14.7634 16.6687 14.55C16.5579 14.3366 16.5001 14.0997 16.5 13.8592V10.1373C16.5001 9.89688 16.5579 9.65996 16.6687 9.44655C16.7795 9.23314 16.9399 9.04949 17.1366 8.91108L21.0136 6.18201C21.0535 6.15382 21.096 6.12964 21.1406 6.10983C21.369 6.00829 21.6191 5.96543 21.8683 5.98514C22.1174 6.00485 22.3577 6.0865 22.5673 6.22268C22.7769 6.35885 22.9491 6.54524 23.0683 6.7649C23.1875 6.98455 23.25 7.23052 23.25 7.48045V16.5161C23.25 16.9139 23.092 17.2954 22.8107 17.5767C22.5294 17.8581 22.1478 18.0161 21.75 18.0161V18.0166Z" fill="black" />
                                        <path d="M12.5625 18.75H3.9375C3.09239 18.7491 2.28214 18.413 1.68456 17.8154C1.08697 17.2179 0.750869 16.4076 0.75 15.5625V8.4375C0.750869 7.59239 1.08697 6.78214 1.68456 6.18456C2.28214 5.58697 3.09239 5.25087 3.9375 5.25H12.585C13.4241 5.25099 14.2286 5.58477 14.8219 6.1781C15.4152 6.77144 15.749 7.57589 15.75 8.415V15.5625C15.7491 16.4076 15.413 17.2179 14.8154 17.8154C14.2179 18.413 13.4076 18.7491 12.5625 18.75Z" fill="black" />
                                      </svg>

                                      {detail.course_text}
                                      <span className="h6">{detail.course_time}</span>
                                    </div>
                                  )
                                })
                              }



                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }</div>
              <div className="col-md-5 text-light p-2 pb-5 pl-4 mobile-none">
                {
                  courseBanners &&
                  courseBanners.map((item, index) => {
                    var img = item.course_content_banner.course_content_image ? process.env.GRAPHIMAGEURL + item.course_content_banner.course_content_image.url : "/assets/images/img21.jpg";
                    return (
                      <div className="p-5 mb-3" style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                        <h2>{item.course_content_banner.course_content_description}</h2>
                        <h5 className="font-weight-light">{item.course_content_banner.course_content_title}</h5>
                        <a href="#" className="btn btn-lightblue text-light rounded-0 mt-0">{item.course_content_banner.button_text}</a>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        </section>
      </>
    )
  }
}

export default Content;