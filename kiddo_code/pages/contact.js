/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import Contact from '../components/Contact';

class ContactUs extends Component {
  render(){
    return(
      <>
        <Layout>
          <Contact />  
        </Layout>
      </>
    )
  }
}

export default ContactUs;