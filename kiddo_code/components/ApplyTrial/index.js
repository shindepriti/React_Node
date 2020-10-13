import React, {Component} from 'react';
import Banner from './Banner/banner';
import TrialSection from './TrialSection/trialsection';
import Activity from './Activity/activity';
import Testimonial from './Testimonial/testimonial';
import Faq from './Faq/faq';

class ApplyTrial extends Component {
    render(){
        return(
            <>
              <Banner />
              <TrialSection />
              <Activity />
              <Testimonial />
              <Faq />
            </>
        )
    }
}
  
export default ApplyTrial;