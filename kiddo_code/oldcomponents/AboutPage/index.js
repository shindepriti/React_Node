import React, {Component} from 'react';
import Banner from './Banner/banner';
import Aboutblog from './Aboutblog/aboutblog';
import Glance from './Glance/glance';
import Aboutteam from './Aboutteam/aboutteam';
import Abouthistory from './Abouthistory/abouthistory';

class AboutPage extends Component {
    render(){
        return(
            <>
                <Banner />
                <Aboutblog />
                <Glance />
                <Aboutteam />
                <Abouthistory />
            </>
        )
    }
}
  
export default AboutPage;