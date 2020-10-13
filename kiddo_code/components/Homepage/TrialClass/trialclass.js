
import React from 'react';

const TrialClass = (props) => {

  return (
    <>
        <section className="footer-singup-wrap pt-6">
            <div className="container">
                <div className="row justify-content-center text-center align-items-center">
                    <div className="col-xl-5 col-lg-5 col-md-5">
                        <h3 className="h1 mb-5 font-weight-bold text-left">Apply for the trial class.</h3>
                        <form action="/apply-trial" method="POST">
                            <div className="mb-3 justify-content-center text-left">
                                <label className="font-weight-bold">Email address</label>
                                <input type="email" name="email" className="mr-sm-1 mb-2 mb-sm-0 form-control form-control-lg" placeholder="Email Address" required />
                                <div data-recaptcha data-sitekey="INSERT_YOUR_RECAPTCHA_V2_SITEKEY_HERE" data-size="invisible" data-badge="bottomleft"></div>
                                <button type="submit" className="ml-sm-1 btn btn-lg btn-primary btn-loading" data-loading-text="Sending">
                                    <span>Get Started</span>
                                </button>
                            </div>
                        </form>
                        <div className="text-small text-left font-weight-normal">
                            Learn more about how we use your information by reading our privacy policy.
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-7">
                        <img src="assets/images/22.svg" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default TrialClass;