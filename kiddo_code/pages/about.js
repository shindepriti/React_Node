/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import AboutPage from '../components/AboutPage';

class About extends Component {
  render(){
    return(
      <>
        <Layout>
          <AboutPage />  
        </Layout>
      </>
    )
  }
}

export default About;