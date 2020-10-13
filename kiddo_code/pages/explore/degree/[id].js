import React, {Component} from 'react';

import Layout from '../../../components/Layout';

import Banner from '../../../components/Degree/Banner/banner';
import Introduction from '../../../components/Degree/Introduction/introduction';
import Stats from '../../../components/Degree/Stats/stats';
import Curriculum from '../../../components/Degree/Curriculum/curriculum';
import Instructor from '../../../components/Degree/Instructor/instructor';
import Review from '../../../components/Degree/Review/review';
import Testimonial from '../../../components/Degree/Testimonial/testimonial';
import Instructors from '../../../components/Degree/Instructors/instructors';
import Creativity from '../../../components/Degree/Creativity/creativity';
import Learning from '../../../components/Degree/Learning/learning';
import Apply from '../../../components/Degree/Apply/apply';

class Degree extends Component {
    render(){
        return(
            <>
                <Layout>
                 <Banner />
                 <Introduction />
                 <Stats />
                 <Curriculum />
                 <Instructor />
                 <Review/>
                 <Testimonial />
                 <Instructors />
                 <Creativity />
                 <Learning />
                 <Apply />
                </Layout>
            </>
        )
    }
}
  
export default Degree;