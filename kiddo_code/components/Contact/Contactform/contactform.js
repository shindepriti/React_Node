import React, {Component} from 'react';
import {Input,Button,InputBase,Snackbar,IconButton} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { useForm } from "react-hook-form";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  
  
class Contactform extends Component {
   constructor(props){
       super(props)
       this.state={
        full_name:'',
        emailid:'',
        contactNumber:'',
        companyName:'',
        fields: [],
        error: {},
        snackbaropen:false,
        snackbarmsg:"",
       }
       
   }


setViewStatus = (value) => {
    let formIsValid = true;
    let fields = this.state.fields;
    let error = {};
    if (!fields['full_name']) {
      formIsValid = false;
      error['full_name'] = 'Please Enter Your Name';
    } else {
      error['full_name'] = '';
    }
    if (!fields['emailid']) {
      formIsValid = false;
      error['emailid'] = 'Please Enter Your Email-id';
    } else {
      error['emailid'] = '';
    }
    if (!fields['companyName']) {
        formIsValid = false;
        error['companyName'] = 'Please Enter Your Company Name';
      } else {
        error['companyName'] = '';
      }
      if (!fields['contactNumber']) {
        formIsValid = false;
        error['contactNumber'] = 'Please Enter Your Contact Number';
      } else {
        error['contactNumber'] = '';
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

  handleChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields: fields
    });
  }

  snackbarClose = ()=>{
    this.setState({snackbaropen:false})
}

  handleClick=(event)=>{
    this.setState({full_name:"",contactNumber:"",companyName:"",emailid:""})
    this.setState({snackbaropen:true,snackbarmsg:" Successfull"})
      
  }

    render(){
        const {  error} = this.state;
        // const { handleSubmit } = useForm();
        // const onSubmit = values => console.log(values);
        const example = () =>{
          const { handleSubmit } = useForm();
        const onSubmit = values => console.log(values);
        }
        return (
            <>
                <React.Fragment>
                    <section className="contact-form">
                    {/* <Snackbar
                    anchorOrigin={{vertical:'center',horizontal:'center'}}
                    open={this.state.snackbaropen}
                    autoHideDuration={4000}
                    onClose={this.snackbarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[<IconButton key="close" arial-label="close" color="inherit" onClick={this.snackbarClose}>
                        x
                    </IconButton>]}
                    /> */}

                    {/* <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.snackbarClose}>
                            <Alert onClose={this.snackbarClose} severity="success">
                            This is a success message!
                            </Alert>
                        </Snackbar> */}
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6 col-lg-4 col-xl-5">
                                    <div className="text-left mb-4 pr-4">
                                        <h2 className="font-weight-bold">Leave a message11111</h2>
                                        <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                    </div>
                                </div>
                                
                                <div className="col-md-6 col-lg-8 col-xl-7 rounded-0">
                                    <form >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Your Name *</label>
                                                    <input name="full_name" id="full_name" type="text" className="form-control" onChange={this.handleChange.bind(this)}  required />
                                                    {/* <div className="invalid-feedback">
                                                        Please type your name.
                                                    </div> */}
                                                    {
                                                        error.full_name && <span style={{color: 'red'}}>{error.full_name}</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Email Address *</label>
                                                    <input  name="emailid" id="emailid" onChange={this.handleChange.bind(this)} placeholder="you@yoursite.com" className="form-control" required />
                                                    {
                                                        error.emailid && <span style={{color: 'red'}}>{error.emailid}</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Company Name</label>
                                                    <input name="companyName" id="companyName"  onChange={this.handleChange.bind(this)} type="text" className="form-control" required />
                                                    {
                                                        error.companyName && <span style={{color: 'red'}}>{error.companyName}</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Contact Number</label>
                                                    <input name="contactNumber" id='contactNumber' type="tel"  onChange={this.handleChange.bind(this)} className="form-control" required />
                                                    {
                                                        error.contactNumber && <span style={{color: 'red'}}>{error.contactNumber}</span>
                                                    }
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
                                                <input type="button" value="send Enquiry" className="btn btn-primary btn-blue btn-loading" onClick={this.handleClick}  onClick={() => this.setViewStatus('wizard')}  data-loading-text="Sending"/>
                                                    <img className="icon" src="assets/img/icons/theme/code/loading.svg" alt="loading icon"  />
                                                    <span>Send Enquiry</span>
                                                    {/* <Button variant="outlined" onClick={this.handleClick}>
                                                            Open success snackbar
                                                    </Button> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        {/* onClick={() => this.setViewStatus('wizard')}   */}
                    </section>
                </React.Fragment>
            </>
        )
                                                  
    }
}

export default Contactform;