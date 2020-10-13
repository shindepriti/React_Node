import React, {Component} from 'react';

import Layout from '../../../components/Layout';

import Banner from '../../../components/Bundle/Banner/banner';
import Introduction from '../../../components/Bundle/Introduction/introduction';
import Stats from '../../../components/Bundle/Stats/stats';
import Content from '../../../components/Bundle/Content/content';
import Instructor from '../../../components/Bundle/Instructor/instructor';
import Frequently from '../../../components/Bundle/Frequently/frequently';
import Testimonial from '../../../components/Bundle/Testimonial/testimonial';
import Instructors from '../../../components/Bundle/Instructors/instructors';
import Creativity from '../../../components/Bundle/Creativity/creativity';
import Learning from '../../../components/Bundle/Learning/learning';
import Apply from '../../../components/Bundle/Apply/apply';

class Bundle extends Component {
    render(){
        return(
            <>
                <Layout>
                 <Banner />
                 <Introduction />
                 <Stats />
                 <Content />
                 <Instructors />
                 <Instructor />
                 <Testimonial />
                 <Creativity />
                 <Frequently/>
                 <Learning />
                 <Apply />
                </Layout>
            </>
        )
    }
}
  
export default Bundle;