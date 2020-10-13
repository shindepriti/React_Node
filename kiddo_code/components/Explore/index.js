import React, {Component} from 'react';
import Banner from './Banner/banner';
import Courses from './Courses/courses';
import WhyWeRock from './WhyWeRock/whywerock';
import TrialClass from './TrialClass/trialclass';


class TeamPage extends Component {
    render(){
        return(
            <>
                <Banner />
                <Courses />
                <WhyWeRock />
                <TrialClass />
            </>
        )
    }
}
  
export default TeamPage;