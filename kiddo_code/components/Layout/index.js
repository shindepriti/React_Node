import React from 'react';
import Footer from './footer';
import Header from './header';
import Head from 'next/head';
import Nprogress from 'nprogress';
import Router from 'next/router';
Router.onRouteChangeStart = () => {
    Nprogress.start();
}
Router.onRouteChangeComplete = () => {
    Nprogress.done();
}
Router.onRouteChangeError = () => {
    Nprogress.done();
}

const Layout = (props) => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
	            <link rel="stylesheet" type="text/css" href="/assets/css/font-awesome.min.css" />
                <link rel="stylesheet" type="text/css" href="/assets/css/theme.css" />    
                <link rel="stylesheet" type="text/css" href="/assets/css/custom.css" />
                <link rel="stylesheet" type="text/css" href="/assets/css/custom-style.css" />
                <link rel="stylesheet" type="text/css" href="/assets/css/responsive.css"></link>
                <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon"></link>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"></link>
                <title>KiddoCode</title>
            </Head>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout