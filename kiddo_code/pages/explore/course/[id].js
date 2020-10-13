import React, {Component} from 'react';

import Layout from '../../../components/Layout';

import Banner from '../../../components/Course/Banner/banner';
import Introduction from '../../../components/Course/Introduction/introduction';
import Stats from '../../../components/Course/Stats/stats';
import Content from '../../../components/Course/Content/content';
import Instructor from '../../../components/Course/Instructor/instructor';
import Review from '../../../components/Course/Review/review';
import Testimonial from '../../../components/Course/Testimonial/testimonial';
import Instructors from '../../../components/Course/Instructors/instructors';
import Creativity from '../../../components/Course/Creativity/creativity';
import Learning from '../../../components/Course/Learning/learning';
import Apply from '../../../components/Course/Apply/apply';

class Course extends Component {
    render(){
        return(
            <>
                <Layout>
                 <Banner />
                 <Introduction />
                 <Stats />
                 <Content />
                 <Instructor />
                 <Review />
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
  
export default Course;