import React, { Component } from 'react';

import Layout from '../../../components/Layout';

import Banner from '../../../components/Tutor/Banner/banner';
import Introduction from '../../../components/Tutor/Introduction/introduction';
import Frequently from '../../../components/Tutor/Frequently/frequently';
import Learning from '../../../components/Tutor/Learning/learning';
import Apply from '../../../components/Tutor/Apply/apply';

class Tutor extends Component {
    render() {
        return (
            <>
                <Layout>
                    <Banner />
                    <Introduction />
                    <Learning />
                    <Frequently />
                    <Apply />
                </Layout>
            </>
        )
    }
}

export default Tutor;