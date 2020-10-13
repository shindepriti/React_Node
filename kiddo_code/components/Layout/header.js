
import React, { Component } from 'react';
import  { Modal } from 'react-bootstrap';
import Logo from "../../public/assets/images/logo.png";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
        openLoginModal: false,
        openRegisterModal: false,
        registerStep: ['Step 1','Step 2','Step 3'],
        currentStep: 0,
        activeClass: ''
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', () => {
      let activeClass = '';
      if(window.scrollY !== 0){
          activeClass = 'sticky';
      }
      this.setState({ activeClass });
   });
  }

  openLogin = () => {
    this.setState({ openLoginModal : !this.state.openLoginModal });
  }

  openRegister = () => {
    this.setState({ openRegisterModal: !this.state.openRegisterModal });
  }

  handleClose(){
    this.setState({ openLoginModal : !this.state.openLoginModal });
  }

  handleRegisterClose(){
    this.setState({ openRegisterModal : !this.state.openRegisterModal });
  }

  nextToggle(event){
    if (event.target.id === "step1") {
      this.setState({ currentStep : 1 });
    }

    if (event.target.id === "step2") {
      this.setState({ currentStep : 2 });
    }
    
    console.log(this.state.currentStep);
  }

  render(){
    // <li className="menu-item">
    //      <a href="#" className="nav-link">Explore</a>
    //  </li>

    // <form role="search" method="get" className="search-form" action="">
    //     <label>
    //       <span className="screen-reader-text"><i className="fa fa-search"></i></span>
    //       <input type="search" className="search-field" placeholder="Search..." name="s" />
    //       </label>
    //       <input type="submit" className="search-submit" value="Search" />
    //   </form>
    //   <div className="bar">
    //     <a href="#">               
    //       <span></span>
    //       <span></span>
    //       <span></span>
    //     </a>
    //   </div>

    // <div id="login_register">
    //   <button className="portfolio-item mx-auto" onClick={this.openLogin.bind(this)}>Login</button>
    // </div>
    return (
      <>
        <div id="header-top-area" className="htw-widget-area widget-area" role="complementary">
          <div className="container">
            <span className="new-tag">News</span>Not sure where to start? Join our free trial class <span className="hover-arrow"></span>
          </div>
        </div>

        <div className={`navbar-container ${this.state.activeClass}` } style={{minHeight: 81 + "px", marginBottom: -81 + "px"}}>
          <nav className="navbar navbar-expand-lg header-menu-cls" data-overlay="" data-sticky="top" style={{maxWidth: 1583 + "px", top: 0 + "px"}}>
            <div className="container">
              <a className="navbar-brand fade-page" href="/">
                <img src={Logo} alt="Kido Code" className="mobile-none" />
                <img src="/assets/images/footer-gif.gif" alt="Kido Code" className="desktop-none"></img>
              </a>
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                  <React.Fragment>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon navbar-toggler-open" data-src="http://localhost/kidocode/wp-content/themes/kidocode/assets/img/icons/interface/menu.svg">
                          <path d="M3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17V17ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12V12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12V12ZM4 6C3.44772 6 3 6.44772 3 7V7C3 7.55228 3.44772 8 4 8H20C20.5523 8 21 7.55228 21 7V7C21 6.44772 20.5523 6 20 6H4Z" fill="#212529"></path>
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="injected-svg icon navbar-toggler-close" data-src="http://localhost/kidocode/wp-content/themes/kidocode/assets/img/icons/interface/cross.svg">
                          <path d="M16.2426 6.34311L6.34309 16.2426C5.95257 16.6331 5.95257 17.2663 6.34309 17.6568C6.73362 18.0473 7.36678 18.0473 7.75731 17.6568L17.6568 7.75732C18.0473 7.36679 18.0473 6.73363 17.6568 6.34311C17.2663 5.95258 16.6331 5.95258 16.2426 6.34311Z" fill="#212529"></path>
                          <path d="M17.6568 16.2426L7.75734 6.34309C7.36681 5.95257 6.73365 5.95257 6.34313 6.34309C5.9526 6.73362 5.9526 7.36678 6.34313 7.75731L16.2426 17.6568C16.6331 18.0473 17.2663 18.0473 17.6568 17.6568C18.0474 17.2663 18.0474 16.6331 17.6568 16.2426Z" fill="#212529"></path>
                      </svg>
                  </React.Fragment>
              </button>
              
              
              <div className="collapse navbar-collapse justify-content-start">
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li className="menu-item">
                      <a href="/explore" className="nav-link">Explore</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="nav-link">Pricing</a>
                    </li>
                    <li className="menu-item dropdown">
                      <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Company</a>
                      <div className="dropdown-menu">
                        <a href="/about" className=" dropdown-item">About</a>
                        <a href="/team" className=" dropdown-item">Team</a>
                        <a href="/careers" className=" dropdown-item">Careers</a>
                        <a href="/blog" className=" dropdown-item">Blog</a>
                        <a href="/legal" className=" dropdown-item">Legal</a>
                        <a href="/contact" className=" dropdown-item">Contact</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <form role="search" method="get" className="search-form" action="">
                <label>
                  <span className="screen-reader-text"><i className="fa fa-search"></i></span>
                  <input type="search" className="search-field" placeholder="Search our catalog" value="" name="s" readOnly/>
                </label>
                <input type="submit" className="search-submit" value="Search" />
              </form>
              <div className="bar">
                <a href="#">               
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </div>
              <div className="cart-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.25 21C9.07843 21 9.75 20.3284 9.75 19.5C9.75 18.6716 9.07843 18 8.25 18C7.42157 18 6.75 18.6716 6.75 19.5C6.75 20.3284 7.42157 21 8.25 21Z" fill="black"/>
                  <path d="M18.75 21C19.5784 21 20.25 20.3284 20.25 19.5C20.25 18.6716 19.5784 18 18.75 18C17.9216 18 17.25 18.6716 17.25 19.5C17.25 20.3284 17.9216 21 18.75 21Z" fill="black"/>
                  <path d="M7.86469 14.25H20.115L21.915 5.25H6.27609L5.87906 3H1.5V4.5H4.62094L6.87094 17.25H20.25V15.75H8.12906L7.86469 14.25Z" fill="black"/>
                </svg>
                <div className="cart-items">10</div>
              </div>
              
              <div id="login_register" className="btn-fill">
                <button className="portfolio-item mx-auto" onClick={this.openRegister.bind(this)}>Apply Now</button>
              </div>
            </div>
          </nav>      
        </div>
        <Modal size="lg" show={this.state.openLoginModal} onHide={this.handleClose.bind(this)} animation={true}>
          <Modal.Body>
            <section className="py-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-auto header-menu-cls">
                    <a href="index.html">
                      <img src="/assets/images/logo.png" alt="Leap" />
                    </a>
                  </div>
                </div>
                <div className="row justify-content-center pt-6 rounded-0">
                  <div>
                    <div className="text-center mb-4">
                      <h1 className="mb-1">Login </h1>
                      <span>Enter your details below</span>
                    </div>
                    <form>
                      <div className="form-group">
                        <input type="email" name="signup-email" placeholder="Email Address" className="form-control" />
                      </div>
                      <div className="form-group">
                        <input type="password" name="signup-password" placeholder="Password" className="form-control" />
                        <div className="text-right"><small><a href="#" className="text-blue">Forgot your password?</a></small></div>
                      </div>
                      <div className="form-group">
                        <button className="btn-block btn btn-primary btn-blue" type="submit">Sign in</button>
                      </div>
                      <div className="custom-control custom-checkbox checkbox-wrap">
                        <input type="checkbox" className="custom-control-input" id="signup-agree" />
                        <label className="custom-control-label text-small text-muted" htmlFor="signup-agree">Keep me signed in
                        </label>
                      </div>
                      <hr />
                      <div className="text-center text-small text-muted">
                        <span>Don't have an account yet? <a href="#" className="text-blue">Create one</a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={this.state.openRegisterModal} onHide={this.handleRegisterClose.bind(this)} animation={true}>
          <Modal.Body>
            <div className="loader">
              <div className="loading-animation"></div>
            </div>

            <section className="min-vh-100 py-5">
              <div className="container">
                <div className="row justify-content-center mb-md-6">
                  <div className="col-auto header-menu-cls">
                    <a href="/">
                      <img src="/assets/images/logo.png" alt="Leap" />
                    </a>
                  </div>
                </div>
                <div className="row justify-content-center pt-6">
                  <div>
                    <div className="text-center mb-4">
                      <h1 className="mb-2">Create account</h1>
                      <span>We’ll collect some details to personalise your experience.</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <form className="wizard">
                      <ul className="progressbar">
                        {
                          this.state.registerStep.map((stepData, i) => {
                            return (
                              <li key={`step-${i}`} className={ i <= this.state.currentStep ? 'active' : ''}
                                style={{ width: 100 / this.state.registerStep.length + '%' }} >
                              </li>
                            )
                          })
                        }
                      </ul>
                      {/*<ul className="d-flex step-circles justify-content-center mb-5">
                        <li><a className="nav-link btn" href="#step-1">1</a>
                        </li>
                        <li><a className="nav-link btn" href="#step-2">2</a>
                        </li>
                        <li><a className="nav-link btn" href="#step-3">3</a>
                        </li>
                      </ul>*/}
                      <div>
                        <div id="step-1" className={this.state.currentStep === 0 ? "active" : "d-none"}>
                          <div className="row justify-content-center rounded-0">
                            <div>
                              <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email Address" />
                              </div>
                              <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" />
                                <small className="text-muted">Must be at least 8 characters</small>
                              </div>
                              <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password" />
                              </div>
                              <button type="button" id="step1" name="step1" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block">Next</button>
                            </div>
                          </div>
                        </div>
                        <div id="step-2" className={this.state.currentStep === 1 ? "active" : "d-none"}>
                          <div className="row justify-content-center rounded-0">
                            <div>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="First Name" />
                              </div>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                                <small className="text-muted">We will never share your name with others.</small>
                              </div>
                              <hr />
                              <div>
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                  <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
                                </div>
                              </div>
                              <hr />
                              <button type="button" id="step2" name="step2" onClick={this.nextToggle.bind(this)} className="btn btn-primary btn-blue sw-btn-next btn-block">Next</button>
                            </div>
                          </div>
                        </div>
                        <div id="step-3" className={this.state.currentStep === 2 ? "active" : "d-none"}>
                          <div className="row justify-content-center rounded-0">
                            <div>
                              <div className="form-group">
                                <div className="form-group">
                                  <select className="custom-select">
                                    <option value="">Select Menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                  <img className="icon" src="assets/images/arrow-caret.svg" alt="arrow-caret interface icon" data-inject-svg />
                                </div>
                              </div>
                              <div className="form-group">
                                <textarea className="form-control" placeholder="Bio Text" rows="5"></textarea>
                              </div>
                              <hr />
                              <div>
                                <div className="custom-control custom-checkbox mb-3 checkbox-wrap">
                                  <input type="checkbox" className="custom-control-input" id="custom-checkbox-example-1" />
                                  <label className="custom-control-label" htmlFor="custom-checkbox-example-1">Check this custom checkbox</label>
                                </div>
                              </div>
                              <hr />
                              <button type="button" id="step3" name="step3" className="btn btn-primary btn-blue btn-block" type="submit">Complete Signup</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Header;