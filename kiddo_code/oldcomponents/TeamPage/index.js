import React, {Component} from 'react';
import Banner from './Banner/banner';
import Teams from './Teams/teams';

class TeamPage extends Component {
    render(){
        return(
            <>
                <Banner />
                <Teams />
            </>
        )
    }
}
  
export default TeamPage;