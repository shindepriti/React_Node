
import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import dateTimeData from './data.json';
import  { Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from "moment";

class Banner extends Component {
    constructor(props) {
      super(props);
      this.state = ({
        viewProfile: "banner",
        registerStep: ['Step 1','Step 2','Step 3','Step 4','Step 5'],
        currentStep: 0,
        fields: [],
        selectChildData: [],
        startDate: new Date(),
        selectedDate: '',
        timeSlot: [],
        openSessionModal: false,
        setDateTimeDetail : '',
        setId: '',
        error: {},
        timeindex: 0
      })
    }

    componentDidMount() {
        
    }

    setViewStatus = (value) => {
      let formIsValid = true;
      let fields = this.state.fields;
      let error = {};
      if (!fields['full_name']) {
        formIsValid = false;
        error['full_name'] = 'Please enter full name';
      } else {
        error['full_name'] = '';
      }
      if (!fields['emailid']) {
        formIsValid = false;
        error['emailid'] = 'Please enter emailid';
      } else {
        error['emailid'] = '';
      }
      if (formIsValid === false) {
        this.setState({
          error: error
        })
      } else {
        this.setState({
          viewProfile: value
        })
      }
    }

    previousToggle(event) {
      let currentStep = this.state.currentStep;
      currentStep -= 1;
      this.setState({ currentStep: currentStep });
    }

    nextToggle(event){
      if (event.target.id === "step1") {
        let formIsValid = true;
        let fields = this.state.fields;
        let error = {};
        if (!fields['prefer']) {
          formIsValid = false;
          error['prefer'] = 'Please select prefer value';
        } else {
          error['prefer'] = '';
        }
        if (!fields['attend']) {
          formIsValid = false;
          error['attend'] = 'Please select attend value';
        } else {
          error['attend'] = '';
        }
        if (formIsValid === false) {
          this.setState({
            error: error
          })
        } else {
          this.setState({ currentStep : 1 });
        }
      }
  
      if (event.target.id === "step2") {
        let formIsValid = true;
        let fields = this.state.fields;
        let error = {};
        if (!fields['customer-specialist'] || !fields['trainer']) {
          formIsValid = false;
          error['preferred_assistance'] = 'Please select preferred assistance';
        } else {
          error['preferred_assistance'] = '';
        }
        if (!fields['children']) {
          formIsValid = false;
          error['children'] = 'Please select children';
        } else {
          error['children'] = '';
        }

        if (!fields['session']) {
          formIsValid = false;
          error['session'] = 'Please select session';
        } else {
          error['session'] = '';
        }

        
        if (formIsValid === false) {
          this.setState({
            error: error
          })
        } else {
          this.setState({ currentStep : 2 });
        }
      }

      if (event.target.id === "step3") {
        let formIsValid = true;
        let fields = this.state.fields;
        let error = {};
        if (!fields['parent_name']) {
          formIsValid = false;
          error['parent_name'] = 'Please enter parent name';
        } else {
          error['parent_name'] = '';
        }
        if (!fields['parent_email']) {
          formIsValid = false;
          error['parent_email'] = 'Please enter parent email';
        } else {
          error['parent_email'] = '';
        }

        if (formIsValid === false) {
          this.setState({
            error: error
          })
        } else {
          this.setState({ currentStep : 3 });
        }
      }

      if (event.target.id === "step4") {
        let formIsValid = true;
        let fields = this.state.fields;
        let error = {};
        let regex = /^[0-9]*$/;
       
        for(let i=0; i<this.state.selectChildData.length; i++) {
          if (!fields['child_name_'+i]) {
            formIsValid = false;
            error['child_name_'+i] = 'Please enter child name';
          } else {
            error['child_name_'+i] = '';
          }

          if (!fields['child_age_'+i]) {
            formIsValid = false;
            error['child_age_'+i] = 'Please enter child age';
          } else {
            if (!regex.test(fields['child_age_'+i])) {
              formIsValid = false;
              error['child_age_'+i] = 'Please enter child age in numeric';
            } else {
              if (fields['child_age_'+i] > 18) {
                formIsValid = false;
                error['child_age_'+i] = 'Please enter child age lessthan 18';
              } else if (fields['child_age_'+i] < 4) {
                formIsValid = false;
                error['child_age_'+i] = 'Please enter child age greaterthan 4';
              } else {
                error['child_age_'+i] = '';
              }
              
            }
            
          }

          if (!fields['child_gender_'+i]) {
            formIsValid = false;
            error['child_gender_'+i] = 'Please select child gender';
          } else {
            error['child_gender_'+i] = '';
          }
        }

        if (formIsValid === false) {
          this.setState({
            error: error
          })
        } else {
          this.setState({ currentStep : 4 });
        }
      }

      if (event.target.id === "step5") {
        let formIsValid = true;
        let fields = this.state.fields;
        let error = {};

        if (this.state.fields['session'] === 'altogether') {
          if (!fields['child_altogether']) {
            formIsValid = false;
            error['child_altogether'] = 'Please select selection date';
          } else {
            error['child_altogether'] = '';
          }

          if (!fields['child_altogether_time']) {
            formIsValid = false;
            error['child_altogether_time'] = 'Please select selection time';
          } else {
            error['child_altogether_time'] = '';
          }

          
        } else if(this.state.setDateTimeDetail === "parent_date_time") {
          if (!fields["parent_date_time"]) {
            formIsValid = false;
            error['parent_date_time'] = 'Please select selection date';
          } else {
            error['parent_date_time'] = '';
          }

          if (!fields["parent_session_time"]) {
            formIsValid = false;
            error['parent_session_time'] = 'Please select selection time';
          } else {
            error['parent_session_time'] = '';
          }
        } else {
          for(let i=0; i<this.state.selectChildData.length; i++) {
            if (!fields['child_session_date_time_'+i]) {
              formIsValid = false;
              error['seperate_child_'+i] = 'Please select selection date and time';
            } else {
              error['seperate_child_'+i] = '';
            }

            if (!fields['child_session_time_'+i]) {
              formIsValid = false;
              error['child_session_time_'+i] = 'Please select selection time';
            } else {
              error['child_session_time_'+i] = '';
            }
            
          }
        }

        if (formIsValid === false) {
          this.setState({
            error: error
          })
        } else {
          console.log(fields);
          fetch('https://webhook.site/4d46ba25-1ccb-4aac-a78c-8a051d52e3fd', {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify({ 
                attend: fields["attend"],
                child_age_0: fields["child_age_0"],
                child_age_1: fields["child_age_1"],
                child_altogether: fields["child_altogether"],
                child_altogether_time: fields["child_altogether_time"],
                child_gender_0: fields["child_gender_0"],
                child_gender_1: fields["child_gender_1"],
                child_name_0: fields["child_name_0"],
                child_name_1: fields["child_name_1"],
                children: fields["children"],
                customerspecialist: fields["customer-specialist"],
                emailid: fields["emailid"],
                full_name: fields["full_name"],
                parent_date_time: fields["parent_date_time"],
                parent_email: fields["parent_email"],
                parent_name: fields["parent_name"],
                parent_session_time: fields["parent_session_time"],
                prefer: fields["prefer"],
                session: fields["session"],
                trainer: fields["trainer"]
              })
          })
          .then((response) => {
            console.log(response);
          });
        }
      }
    }

    handleSessionModal = (event) => {
      if (event.target.name === "child_altogether") {
        this.setState({
          setDateTimeDetail : 'child_altogether',
          setId: '',
          openSessionModal: !this.state.openSessionModal,
          timeSlot: [],
          timeindex: ''
        });
      } else if(event.target.name === "parent_date_time") {
        this.setState({
          setDateTimeDetail : 'parent_date_time',
          setId: '',
          openSessionModal: !this.state.openSessionModal,
          timeSlot: [],
          timeindex: ''
        });
      } else {
        this.setState({
          setDateTimeDetail : 'child_seperate',
          setId: event.target.id,
          openSessionModal: !this.state.openSessionModal,
          timeSlot: [],
          timeindex: ''
        });
      }
    }

    handleModalClose = () => {
      this.setState({ openSessionModal: !this.state.openSessionModal, setDateTimeDetail : '', setId: '', });
    }

    handleChildInfoChange = (event) => {
      let data = event.target.value;
      let selectChildData = [];
      let fields = this.state.fields;
      for (let k = 0; k < data; k++) {
        selectChildData.push(k);
      }
      fields[event.target.id] = event.target.value;
      this.setState({ selectChildData: selectChildData, fields: fields });
    }

    handleChildAgeChange = (event) => {
      let fields = this.state.fields;
      if (event.target.checked) {
        fields[event.target.name] = 'girl';
      } else {
        fields[event.target.name] = 'boy';
      }
      
      this.setState({
        fields: fields
      });
    }

    handleChange = (event) => {
      let fields = this.state.fields;
      fields[event.target.name] = event.target.value;
      this.setState({
        fields: fields
      });
    }

    handleTimeChange = (value, index) => {
      console.log("In Time Chnage Function");
      let fields = this.state.fields;

      if (this.state.setDateTimeDetail === "child_altogether") {
        fields['child_altogether_time'] = value.time;
        this.setState({
          fields: fields,
          timeindex: index
        });
      } else if(this.state.setDateTimeDetail === "parent_date_time") {
        fields['parent_session_time'] = value.time;
        this.setState({
          fields: fields,
          timeindex: index
        });
      } else {
        fields['child_session_time_'+this.state.setId] = value.time;
        this.setState({
          fields: fields,
          timeindex: index
        });
      }
    }

    handleDateChange = date => {
      let fields = this.state.fields;

      if (this.state.setDateTimeDetail === "child_altogether") {
        fields['child_altogether'] = moment(date).format("YYYY-MM-DD");
        let child_date = moment(date).format("DD");
        child_date = Number(child_date - 1);
        let timeSlotData = dateTimeData[child_date];
        this.setState({
          selectedDate: date,
          fields: fields,
          timeSlot: timeSlotData.slots
        });
      } else if(this.state.setDateTimeDetail === "parent_date_time") {
        fields['parent_date_time'] = moment(date).format("YYYY-MM-DD");
        let child_date = moment(date).format("DD");
        child_date = Number(child_date - 1);
        let timeSlotData = dateTimeData[child_date];
        this.setState({
          selectedDate: date,
          fields: fields,
          timeSlot: timeSlotData.slots
        });
      } else {
        fields['child_session_date_time_'+this.state.setId] = moment(date).format("YYYY-MM-DD");
        let child_date = moment(date).format("DD");
        child_date = Number(child_date - 1);
        let timeSlotData = dateTimeData[child_date];
        this.setState({
          selectedDate: date,
          fields: fields,
          timeSlot: timeSlotData.slots
        });
      }
    };

    render(){
      const { viewProfile, registerStep, currentStep, selectChildData, error, timeSlot, timeindex } = this.state;
        return (
            <>
              {
                viewProfile === 'banner' && 
                <React.Fragment>
                  <div className="col-md-12 mobile-none">
                    <div className="row logo-wrap">
                      <div className="col-md-4" />
                      <div className="col-md-8 pr-6 o-hidden">
                        <div className="row justify-content-center mb-md-6">
                          <div className="col-auto header-menu-cls pt-4">
                            <a href="/">
                              <img src="/assets/images/logo.png" alt="Leap" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section className="bg-dark-blue text-light header-inner p-0 jarallax position-relative pt-0 o-hidden explore-img-sec desktop-none" data-jarallax data-speed="0.2" data-overlay>
                    <div className="decoration-wrapper">
                      <div className="decoration top right desktop-none" data-jarallax-element="0 0">
                          <img src="/assets/images/24.svg" />
                      </div>
                    </div>
                    <div className="decoration-wrapper">
                      <div className="decoration bottom right bottom desktop-none" data-jarallax-element="60 0" style={{width: 40+"%",zIndex: -1}}>
                          <img src="/assets/images/bg-shape1.svg" />
                      </div>
                    </div>
                    <div className="decoration-wrapper">
                      <div className="decoration top left desktop-none" data-jarallax-element="0 0">
                          <img src="/assets/images/bg-shape2.svg" />
                      </div>
                    </div>
                    <div className="container py-0 pt-3 pb-3 text-center">
                      <div className="row my-2 my-md-5" data-aos="fade-up">
                        <div className="col-lg-9 col-xl-9 m-auto">
                          <a href="/" className="header-menu-logo mb-2">
                            <img src="/assets/images/logo.png" alt="Leap" />
                          </a>
                          <h1 className="display-4"> Apply for trial session</h1>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="py-0 o-hidden account-form-wrap">
                    <div className="col-md-12">
                      <div className="row align-items-center">
                        <div className="col-lg-4 col-md-3 p-0 bg-img-wrap">
                          <img src="/assets/images/bg-img.jpg" />
                        </div>
                        <div className="col-lg-8 col-md-9 pr-6">
                          <div className="row justify-content-center">
                              <div className="decoration-wrapper mobile-none">
                                <div className="decoration top left d-md-block" data-jarallax-element="350 70">
                                    <img src="/assets/images/yellow-squre-shape.svg" />
                                </div>
                              </div>
                              <div className="decoration-wrapper mobile-none">
                                <div className="decoration bottom right mb-0 mr-6 d-md-block" data-jarallax-element="0 80">
                                    <img src="/assets/images/green-circle-shape-15.svg" />
                                </div>
                              </div>
                              <div className="decoration-wrapper mobile-none">
                                <div className="decoration my-n12 middle-x d-md-block" data-jarallax-element="120 200">
                                    <img src="/assets/images/orange-triange-2.svg" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 pt-6 mobile-none">
                                <div className="text-center mb-4">
                                  <h2 className="h1">Join thousands learning online with Kidocode</h2>
                                </div>
                              </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <form>
                                <div className="row justify-content-center rounded-0">
                                  <div className="col-xl-5 col-lg-6 col-md-6">
                                    <div className="form-group">
                                      <label>Name</label>
                                      <input type="text" name="full_name" id="full_name" onChange={this.handleChange.bind(this)} placeholder="Enter Name" className="form-control" />
                                      {
                                        error.full_name && <span style={{color: 'red'}}>{error.full_name}</span>
                                      }
                                    </div>
                                    <div className="form-group">
                                      <label>Email </label>
                                      <input type="email" name="emailid" id="emailid" onChange={this.handleChange.bind(this)} placeholder="Enter Email" className="form-control" />
                                      {
                                        error.emailid && <span style={{color: 'red'}}>{error.emailid}</span>
                                      }
                                    </div>
                                    <button type="button" onClick={() => this.setViewStatus('wizard')} className="btn btn-primary sw-btn-next btn-block">Apply for trial</button>
                                    <div className="mt-3 text-center">
                                      <div className="custom-control custom-checkbox checkbox-wrap mt-3 text-center">
                                        <input type="checkbox" name="signup-agree" className="custom-control-input" id="signup-agree" />
                                        <label className="custom-control-label text-small text-muted font-weight-normal" htmlFor="signup-agree">I agree to the Terms & Conditions
                                        </label>
                                      </div>
                                  </div>
                                  </div>
                                </div>
                              </form>
                              <div className="or-txt col-lg-5 col-md-6 mx-auto mt-3 text-center">
                                <h6 className="text-muted">OR</h6>
                              </div>
                              <div className="col-lg-5 col-md-6 mx-auto">
                                <h6 className="text-muted text-xsmall text-center mt-2">Already have an account? <a href="#" className="text-primary">Login </a></h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </React.Fragment>
              }
              {
                viewProfile === 'wizard' &&
                <React.Fragment>
                  <section className="trial-wizards p-0">
                    <div className="row">
                      <div className="col-md-12">
                        <form className="wizard">
                          <h4><img src="/assets/images/footer-gif.gif" />Trial session registration</h4>
                          <ul className="progressbar d-flex step-circles justify-content-center mb-5 col-xl-8 col-lg-8 col-md-7 mobile-none">
                            {
                              registerStep.map((stepData, i) => {
                                return (
                                  <li key={`step-${i}`} className={ i <= this.state.currentStep ? 'active' : ''}
                                    style={{ width: 100 / this.state.registerStep.length + '%' }} >
                                  </li>
                                )
                              })
                            }
                          </ul>
                          <div>
                            <div id="step-1" className={currentStep === 0 ? "active" : "d-none"}>
                              <div className="row justify-content-center rounded-0">
                                <div className="col-xl-5 col-lg-5 col-md-5 mobile-none">
                                  <div className="trial-bg">
                                    <img src="/assets/images/img26.jpg" />
                                  </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 right-form">
                                  <div className="form-group">
                                    <label className="mt-0">Who are you?</label>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="custom-radio-example-1" name="prefer" className="custom-control-input" value="Parent" onChange={this.handleChange.bind(this)} />
                                      <span></span>
                                      <label className="custom-control-label" htmlFor="custom-radio-example-1">Parent </label>
                                    </div>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="custom-radio-example-2" name="prefer" className="custom-control-input" value="Student" onChange={this.handleChange.bind(this)} />
                                      <span></span>
                                      <label className="custom-control-label" htmlFor="custom-radio-example-2">Student </label>
                                    </div>
                                    {
                                      error.prefer && <span style={{color: 'red'}}>{error.prefer}</span>
                                    }
                                  </div>
                                  <div className="form-group">
                                    <label>How would you like to attend?</label>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="custom-radio-example-3" name="attend" className="custom-control-input" value="Parent" onChange={this.handleChange.bind(this)} />
                                      <span></span>
                                      <label className="custom-control-label" htmlFor="custom-radio-example-3">Parent </label>
                                    </div>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="custom-radio-example-4" name="attend" className="custom-control-input" value="Student" onChange={this.handleChange.bind(this)} />
                                      <span></span>
                                      <label className="custom-control-label"  htmlFor="custom-radio-example-4">Student </label>
                                    </div>
                                    {
                                      error.attend && <span style={{color: 'red'}}>{error.attend}</span>
                                    }
                                  </div>
                                  <div className="nxt-back-btn">
                                    <button type="button" onClick={() => this.setViewStatus('banner')} className="btn btn-primary btn-blue sw-btn-back btn-block">back</button>
                                    <button type="button" id="step1" name="step1" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block nxt-btn">Next</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="step-2" className={currentStep === 1 ? "active" : "d-none"}>
                              <div className="row justify-content-center rounded-0">
                                <div className="col-xl-5 col-lg-5 col-md-5 mobile-none">
                                  <div className="trial-bg">
                                    <img src="/assets/images/bg-img06.jpg" />
                                    <div className="info-wrap">
                                      <div className="info-box">
                                        <img src="/assets/images/ic-bulb.svg" />
                                        <h6>Assitance preferrences</h6>
                                        <p>We recommend trainer assistance for parents registering any child below 16 years. <br/><br/>Customer specialists help guide you towards the right products and offers. Highly recommended.</p>
                                      </div>
                                      <div className="info-box">
                                        <img src="/assets/images/ic-bulb.svg" />
                                        <h6>Scheduling tips</h6>
                                        <p>Each child will require his/her own computer to complete the trial session. <br/><br/>If you dont have personal computers for each of your children to use at the same time, choose "Separately"</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 right-form">
                                  <div className="form-group">
                                    <label className="mt-0">Choose your preferred assitance</label>
                                    <div className="custom-control custom-checkbox checkbox-wrap mt-3 text-center">
                                      <input type="checkbox" className="custom-control-input" name="customer-specialist" id="customer-specialist" value="Customer specialist" onChange={this.handleChange.bind(this)} />
                                      <label className="custom-control-label text-small font-weight-normal" htmlFor="customer-specialist">Customer specialist
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox checkbox-wrap mt-3 text-center">
                                      <input type="checkbox" className="custom-control-input" onChange={this.handleChange.bind(this)} name="trainer" id="trainer" value="Trainer" />
                                      <label className="custom-control-label text-small font-weight-normal" htmlFor="trainer">Trainer 
                                      </label>
                                    </div>
                                    {
                                      error.preferred_assistance && <span style={{color: 'red'}}>{error.preferred_assistance}</span>
                                    }
                                  </div>
                                  <div className="form-group">
                                    <label>How many children are you registering?</label>
                                    <select id="children" name="children" onChange={this.handleChildInfoChange.bind(this)}>
                                      <option value="">Select number of children</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    {
                                      error.children && <span style={{color: 'red'}}>{error.children}</span>
                                    }
                                  </div>
                                  <div className="form-group">
                                    <label>How would you like to schedule your sessions?</label>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="separately" name="session" className="custom-control-input" onChange={this.handleChange.bind(this)} value="separately" />
                                      <span></span>
                                      <label className="custom-control-label" htmlFor="separately">Separately </label>
                                    </div>
                                    <div className="custom-control custom-radio mb-2">
                                      <input type="radio" id="altogether" name="session" className="custom-control-input" onChange={this.handleChange.bind(this)} value="altogether" />
                                      <span></span>
                                      <label className="custom-control-label" htmlFor="altogether">Altogether </label>
                                    </div>
                                    {
                                      error.session && <span style={{color: 'red'}}>{error.session}</span>
                                    }
                                  </div>
                                  <div className="nxt-back-btn">
                                    <button type="button" onClick={this.previousToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-back btn-block">back</button>
                                    <button type="button" id="step2" name="step2" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block nxt-btn">Next</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="step-3" className={currentStep === 2 ? "active" : "d-none"}>
                              <div className="row justify-content-center rounded-0">
                                <div className="col-xl-5 col-lg-5 col-md-5 mobile-none">
                                  <div className="trial-bg">
                                    <img src="/assets/images/bg-img06.jpg" />
                                  </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 right-form child-info">
                                  <h6>Parent information </h6>
                                  <div className="form-group mw-300">
                                    <label className="mt-3 mb-1 info-label">Parent name</label>
                                    <input type="text" name="parent_name" id="parent_name" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Boe Johnson" />
                                    {
                                      error.parent_name && <span style={{color: 'red'}}>{error.parent_name}</span>
                                    }
                                  </div>
                                  <div className="form-group mw-300">
                                    <label className="mt-3 mb-1 info-label">Parent email </label>
                                    <input type="email" name="parent_email" id="parent_email" onChange={this.handleChange.bind(this)} className="form-control" placeholder="boe@example.com" />
                                    {
                                      error.parent_email && <span style={{color: 'red'}}>{error.parent_email}</span>
                                    }
                                  </div>
                                  <div className="form-group mw-300">
                                    <label className="mt-3 mb-1 info-label">Parent phone (optional)</label>
                                    <input type="phone" name="parent_phone" id="parent_phone" onChange={this.handleChange.bind(this)} className="form-control" placeholder="+6012345678" />
                                  </div>
                                  <div className="nxt-back-btn">
                                    <button type="button" onClick={this.previousToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-back btn-block">back</button>
                                    <button type="button" id="step3" name="step3" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block nxt-btn">Next</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="step-4" className={currentStep === 3 ? "active" : "d-none"}>
                              <div className="row justify-content-center rounded-0">
                                <div className="col-xl-5 col-lg-5 col-md-5 mobile-none">
                                  <div className="trial-bg">
                                    <img src="/assets/images/bg-img06.jpg" />
                                  </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 right-form child-info">
                                  <h6>Child information  </h6>
                                  {
                                    selectChildData.length > 0 ?
                                      selectChildData.map((val, k) => (
                                      <React.Fragment key={k}>
                                        <div className="row">
                                          <div className="form-group mw-300 col-md-6">
                                            <label className="mt-2 mb-1 info-label">Child name</label>
                                            <input type="text" name={"child_name_"+k} onChange={this.handleChange.bind(this)} className="form-control" placeholder="Joe Malone" />
                                            {
                                              error["child_name_"+k] && <span style={{color: 'red'}}>{error["child_name_"+k]}</span>
                                            }
                                          </div>
                                          <div className="form-group mw-300 col-md-3">
                                            <label className="mt-2 mb-1 info-label">Child age</label>
                                            <input type="text" name={"child_age_"+k} onChange={this.handleChange.bind(this)} className="form-control" placeholder="4 - 18" />
                                            {
                                              error["child_age_"+k] && <span style={{color: 'red'}}>{error["child_age_"+k]}</span>
                                            }
                                          </div>
                                          <div className="form-group mw-300 col-md-3 toggle-btn-wrap" style={{alignSelf: "flex-end"}}>
                                            {/*<button type="button" className="btn btn-sm btn-toggle active" data-toggle="button" name={"child_gender_"+k} onChange={this.handleChange.bind(this)} aria-pressed="true" autoComplete="off">
                                            <div className="handle"></div>
                                            </button>*/}                                              
                                            <div className="button b2" id="button-13">
                                              <input type="checkbox" name={"child_gender_"+k} onChange={this.handleChildAgeChange.bind(this)} value={this.state.fields['child_gender_'+k] ? "boy" : this.state.fields['child_gender_'+k]} className="checkbox" />
                                              <div className="knobs">
                                                <span></span>
                                              </div>
                                              <div className="layer"></div>
                                            </div>
                                            {
                                              error["child_gender_"+k] && <span style={{color: 'red'}}>{error["child_gender_"+k]}</span>
                                            }
                                          </div>
                                          
                                        </div>
                                      </React.Fragment>
                                      ))  
                                      : null                              
                                  }
                                  <div className="nxt-back-btn">
                                    <button type="button" onClick={this.previousToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-back btn-block">back</button>
                                    <button type="button" id="step4" name="step4" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block nxt-btn">Next</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="step-5" className={currentStep === 4 ? "active" : "d-none"}>
                              <div className="row justify-content-center rounded-0 session-time">
                                <div className="col-xl-5 col-lg-5 col-md-5 mobile-none">
                                  <div className="trial-bg">
                                    <img src="/assets/images/bg-img06.jpg" />
                                  </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 right-form child-info">
                                  {this.state.fields["session"]}
                                  {
                                    this.state.fields["session"] && this.state.fields["session"] === 'altogether' ? (
                                      <React.Fragment>
                                        <div className="row">
                                          <div className="col-md-6">
                                            {
                                              selectChildData.length > 0 ?
                                              selectChildData.map((val, k) => (
                                              <React.Fragment key={k}>
                                                <div className="row col-md-12">
                                                  <div className="form-group col-md-8">
                                                    <img src="/assets/images/image-8.jpg" alt="Avatar" className="avatar" />
                                                    <div className="info-wrap">
                                                      <h5 className="mb-1">{this.state.fields["child_name_"+k]}</h5>
                                                      <p className="mb-0">{this.state.fields["child_age_"+k]} years old</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </React.Fragment>
                                            ))
                                            : null                              
                                            }
                                          </div>  
                                          <div className="form-group col-md-6" style={{alignSelf: "baseline"}}>
                                            <label className="mb-1">Session date and time</label>
                                            {
                                              this.state.fields['child_altogether'] && this.state.fields['child_altogether'] ? (
                                                <input type="text" className="form-control calendar" value={this.state.fields["child_altogether"]} name={"child_date_time"} placeholder="Pick session slot" readOnly /> 
                                              ) : (
                                                <button type="button" name="child_altogether" id="child_altogether" onClick={this.handleSessionModal.bind(this)} className="form-control calendar">Pick session slot</button>
                                              )
                                            }
                                            {
                                              error.child_altogether && <span style={{color: 'red'}}>{error.child_altogether}</span>
                                            }
                                            {
                                              error.child_altogether_time && <span style={{color: 'red'}}>{error.child_altogether_time}</span>
                                            }
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <hr />
                                        </div>
                                        
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        {
                                          selectChildData.length > 0 ?
                                          selectChildData.map((val, k) => (
                                            <React.Fragment key={k}>
                                              <div className="row">
                                                <div className="form-group col-md-6">
                                                  <img src="/assets/images/image-8.jpg" alt="Avatar" className="avatar" />
                                                  <div className="info-wrap">
                                                    <h5 className="mb-1">{this.state.fields["child_name_"+k]}</h5>
                                                    <p className="mb-0">{this.state.fields["child_age_"+k]} years old</p>
                                                  </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                  <label className="mb-1">Session date and time</label>
                                                  {
                                                    this.state.fields['child_session_date_time_'+k] && this.state.fields['child_session_date_time_'+k] ? (
                                                      <input type="text" className="form-control calendar" value={this.state.fields["child_session_date_time_"+k]} name={"child_session_date_time_"+k} placeholder="Pick session slot" readOnly /> 
                                                    ) : (
                                                      <button type="button" name={"seperate"} id={k} onClick={this.handleSessionModal.bind(this)} className="form-control calendar" >Pick session slot</button>
                                                    )
                                                  }
                                                  {
                                                    error["seperate_child_"+k] && <span style={{color: 'red'}}>{error["seperate_child_"+k]}</span>
                                                  }
                                                  {
                                                    error["child_session_time_"+k] && <span style={{color: 'red'}}>{error["child_session_time_"+k]}</span>
                                                  }
                                                  
                                                </div>
                                                <div className="col-md-12">
                                                  <hr />
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          ))
                                          : null                              
                                        }
                                      </React.Fragment>
                                    )
                                  }
                                  <div className="row">
                                    <div className="form-group col-md-6">
                                      <img src="/assets/images/image-9.png" alt="Avatar" className="avatar" />
                                      <div className="info-wrap">
                                        <h5 className="mb-1">{this.state.fields["parent_name"]}</h5>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                      <label className="mb-1">Session date and time</label>
                                      {
                                        this.state.fields['parent_date_time'] && this.state.fields['parent_date_time'] ? (
                                          <input type="text" className="form-control calendar" value={this.state.fields["parent_date_time"]} name={"parent_date_time"} placeholder="Pick session slot" readOnly /> 
                                        ) : (
                                          <button type="button" className="form-control calendar" id="parent_date_time" name="parent_date_time" onClick={this.handleSessionModal.bind(this)}>Pick session slot</button>
                                        )
                                      }
                                      {
                                        error.parent_date_time && <span style={{color: 'red'}}>{error.parent_date_time}</span>
                                      }
                                      {
                                        error.parent_session_time && <span style={{color: 'red'}}>{error.parent_session_time}</span>
                                      }
                                    </div>
                                    <div className="col-md-12">
                                      <hr />
                                    </div>
                                  </div>  
                                  <div className="nxt-back-btn">
                                    <button type="button" onClick={this.previousToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-back btn-block">back</button>
                                    <button type="button" id="step5" name="step5" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block nxt-btn">Next</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </React.Fragment>
              }
              <Modal size="lg" show={this.state.openSessionModal} onHide={this.handleModalClose.bind(this)} animation={true}>
                <Modal.Body>
                  <div className="m-xl-4 m-3 row">
                    <div className="col-md-4">
                      <h3>Session name</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis sit nisi posuere massa. Nulla enim luctus facilisis at.</p>
                    </div>
                    <div className="col-md-4">
                      <h5>Select a date</h5>
                      <div className="app">
                        <div className="app__main">
                          <div className="calendar">
                            <div id="calendar"></div>
                          </div>
                        </div>
                      </div>
                      <DatePicker
                        selected={this.state.startDate}
                        minDate={this.state.startDate}
                        onChange={this.handleDateChange}
                        monthsShown={1}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="time-slot-sec text-center">
                        <h4 className="mb-1">Pick time slot</h4>
                        <h6 className="text-muted mb-4">{this.state.selectedDate && moment(this.state.selectedDate).format("dddd, MMMM DD")}</h6>
                        <ul>
                          {
                            timeSlot.length > 0 ?
                            timeSlot.map((val, k) => (
                              <React.Fragment>
                                <li className={timeindex === k ? "active" : ""} onClick={() => this.handleTimeChange(val, k)}>
                                  <button className="bg-dark-blue">{val.time + ':00'} {val.time < 12 ? 'am' : 'pm'}</button>
                                </li>
                              </React.Fragment>
                            )) : null
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </>
        )
    }
}
export default Banner;