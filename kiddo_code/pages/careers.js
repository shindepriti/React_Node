/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import Career from '../components/Careers';

class Careers extends Component {
  render(){
    return(
      <>
        <Layout>
          <Career />  
        </Layout>
      </>
    )
  }
}

export default Careers;