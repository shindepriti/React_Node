/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import Blogs from '../components/Blogs';

class Blog extends Component {
  render(){
    return(
      <>
        <Layout>
            <Blogs />  
        </Layout>
      </>
    )
  }
}

export default Blog;