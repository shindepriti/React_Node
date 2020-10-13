/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import HomePage from '../components/Homepage';

class Index extends Component {
  render(){
    return(
      <>
        <Layout>
          <HomePage />  
        </Layout>
      </>
    )
  }
}

export default Index;