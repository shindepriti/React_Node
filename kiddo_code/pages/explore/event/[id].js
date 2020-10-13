import React, { Component } from 'react';

import Layout from '../../../components/Layout';

import Banner from '../../../components/Event/Banner/banner';
import Introduction from '../../../components/Event/Introduction/introduction';
import Details from '../../../components/Event/Details/details';
import Gallery from '../../../components/Event/Gallery/gallery';
import UpcomingEvents from '../../../components/Event/UpcomingEvents/upcoming';
import Frequently from '../../../components/Event/Frequently/frequently';
import Learning from '../../../components/Event/Learning/learning';
import Apply from '../../../components/Event/Apply/apply';

class Event extends Component {
    render() {
        return (
            <>
                <Layout>
                    <Banner />
                    <Introduction />
                    <Details />
                    <Gallery />
                    <UpcomingEvents />
                    <Learning />
                    <Frequently />
                    <Apply />
                </Layout>
            </>
        )
    }
}

export default Event;