import React, {Component} from 'react';
import Banner from './Banner/banner';
import Mapaddress from './MapAddress/mapaddress';
import ContactForm from './Contactform/contactform';

class ContactUs extends Component {
    render(){
        return(
            <>
                <Banner />
                <Mapaddress />
                <ContactForm />
            </>
        )
    }
}
  
export default ContactUs;