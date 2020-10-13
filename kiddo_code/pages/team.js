/*import { useGraphQL } from 'graphql-react'*/
import React, {Component} from 'react';
import Layout from '../components/Layout';
import TeamPage from '../components/TeamPage';

class Team extends Component {
  render(){
    return(
      <>
        <Layout>
          <TeamPage />  
        </Layout>
      </>
    )
  }
}

export default Team;