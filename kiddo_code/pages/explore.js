/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import Explore from '../components/Explore';

class Team extends Component {
  render(){
    return(
      <>
        <Layout>
          <Explore />  
        </Layout>
      </>
    )
  }
}

export default Team;