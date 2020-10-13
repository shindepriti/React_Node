import React, {Component} from 'react';
import Banner from './Banner/banner';
import Careerblog from './Careerblog/careerblog';
import Whywork from './Whywork/whywork';
import Lifekiddo from './Lifekiddo/lifekiddo';
import Position from './Position/position';

class Careers extends Component {
    render(){
        return(
            <>
                <Banner />
                <Careerblog />
                <Whywork />
                <Lifekiddo />
                <Position />
            </>
        )
    }
}
  
export default Careers;