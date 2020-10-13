import React, {Component} from 'react';
import Banner from './Banner/banner';
import HomeProduct from './HomeProduct/homeproduct';
import Glance from './Glance/glance';
import WhyWeRock from './WhyWeRock/whywerock';
import HomeTestimonials from  './HomeTestimonial/hometestimonial';
import Showcase from './Showcase/showcase';
import KiddoFeedback from './KiddoFeedback/kiddofeedback';
import CourseTopic from './CourseTopic/coursetopic';
// import Community from './Community/community';
import TrialClass from './TrialClass/trialclass';
import UpcomingEventHome from './UpcomingEventHome/upcomingeventhome';
import LearnFascinate from './LearnFascinate/learnfascinate';
class Homepage extends Component {
    render(){
        return(
            <>
                <Banner />
                <HomeProduct />
                <Glance />
                <HomeTestimonials />
                <WhyWeRock />
                <Showcase />
                <KiddoFeedback />
                <CourseTopic />
                <LearnFascinate />
                <UpcomingEventHome/>
                <TrialClass />
            </>
        )
    }
}
  
export default Homepage;