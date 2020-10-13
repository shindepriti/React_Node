import React, {Component} from 'react';

class Contactform extends Component {
   constructor(props){
       super(props)
       this.state={
        

       }

   }
   
    render(){
        return (
            <>
                <React.Fragment>
                    <section className="contact-form">
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6 col-lg-4 col-xl-5">
                                    <div className="text-left mb-4 pr-4">
                                        <h2 className="font-weight-bold">Leave a message11111</h2>
                                        <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-8 col-xl-7 rounded-0">
                                    <form action="" data-form-email>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Your Name *</label>
                                                    <input name="contact-name" type="text" className="form-control"  required />
                                                    <div className="invalid-feedback">
                                                        Please type your name.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Email Address *</label>
                                                    <input name="contact-email" type="email" placeholder="you@yoursite.com" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Company Name</label>
                                                    <input name="contact-company" type="text" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Contact Number</label>
                                                    <input name="contact-phone" type="tel" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Message:</label>
                                                    <textarea className="form-control" name="contact-message" rows="10" placeholder="How can we help?"></textarea>
                                                </div>
                                            </div>
                                            <div className="col text-right">
                                                <div className="d-none alert alert-success" role="alert" data-success-message>
                                                    Thanks, a member of our team will be in touch shortly.
                                                </div>
                                                <div className="d-none alert alert-danger" role="alert" data-error-message>
                                                    Please fill all fields correctly.
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-blue btn-loading" data-loading-text="Sending">
                                                    <img className="icon" src="assets/img/icons/theme/code/loading.svg" alt="loading icon" data-inject-svg />
                                                    <span>Send Enquiry</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            </>
        )
    }
}

export default Contactform;