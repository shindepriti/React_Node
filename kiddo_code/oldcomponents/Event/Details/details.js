import React, { Component } from 'react';
const fetch = require('isomorphic-fetch');
import Router from 'next/router';
const moment = require('moment');

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEvent: {},
            remainingTime: {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            }
        };
    }

    componentDidMount() {
        let id = Router.query.id;
        let splitData = id.split('-');
        var query = `
                    query ActivityById($id: ID!){
                        products(where:{id:$id}){
                            id,
                            product_name,
                            product_introduction,
                            product_hours,
                            product_type{
                              id,
                              product_type
                            },
                            product_date,
                            product_start_time,
                            product_end_time,
                            product_total_seats,
                            product_remain_seats,
                            product_event_map
                        }
                    }
                    `;
        var variables = {
            "id": Number(splitData[0])
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    currentEvent: response.data.products.length ? response.data.products[0] : {},
                });
                setInterval(() => this.duration(), 1000);
            });

    }
    duration() {
        var currentTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        var eventTime = this.state.currentEvent.product_date + ' ' + this.state.currentEvent.product_start_time;
        eventTime = moment(eventTime).format('YYYY-MM-DD hh:mm:ss');
        if (currentTime < eventTime) {
            let duration = (new Date(eventTime)) - (new Date(currentTime));
            if (duration > 0) {
                var seconds = parseInt((duration / 1000) % 60)
                    , minutes = parseInt((duration / (1000 * 60)) % 60)
                    , hours = parseInt((duration / (1000 * 60 * 60)) % 24)
                    , days = parseInt((duration / (24 * 60 * 60 * 1000)));

                days = (days < 10) ? "0" + days : days;
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
            } else {
                var seconds = '00'
                    , minutes = '00'
                    , hours = '00'
                    , days = '00'
            }
        }
        else {
            var seconds = '00'
                , minutes = '00'
                , hours = '00'
                , days = '00'
        }

        this.setState({
            remainingTime: {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            }
        })
    }
    render() {
        const { currentEvent, remainingTime } = this.state;
        return (
            <>
                <section className="event-details-wrap dark-blue-bg text-light">
                    <div className="container">
                        <h2 className="mb-6">Event details </h2>
                        <div className="row">
                            <div className="col-lg-5 col-md-6">

                                <div className="col-12 add-countdown-time" data-countdown-date="2020/07/28" data-detailed="">
                                    <div data-active="" className="row text-center">

                                        <span>
                                            <span className="h1 text-primary mb-2" data-days="" data-format="%d">{remainingTime.days ? remainingTime.days : '-'}</span> <span className="h1 text-primary column">:</span>
                                            <span className="h6 mb-0" data-days-label="">Days</span>
                                        </span>

                                        <span>
                                            <span className="h1 text-primary mb-2" data-hours="">{remainingTime.hours ? remainingTime.hours : '-'}</span> <span className="h1 text-primary column">:</span>
                                            <span className="h6 mb-0" data-hours-label="">Hours</span>
                                        </span>

                                        <span>
                                            <span className="h1 text-primary mb-2" data-minutes="">{remainingTime.minutes ? remainingTime.minutes : '-'}</span> <span className="h1 text-primary column">:</span>
                                            <span className="h6 mb-0" data-minutes-label="">Minutes</span>
                                        </span>

                                        <span>
                                            <span className="h1 text-primary mb-2" data-seconds="">{remainingTime.seconds ? remainingTime.seconds : '-'}</span>
                                            <span className="h6 mb-0" data-seconds-label="">Seconds</span>
                                        </span>
                                    </div>
                                    <div data-elapsed="" style={{ display: 'none' }}>
                                        <h1>This is the fallback for when the countdown is elapsed</h1>
                                    </div>
                                </div>

                                <div className="border-bottom pt-6 mb-5"></div>

                                <div className="event-details-main">
                                    <div className="col-6 event-details">
                                        <h6>Date</h6>
                                        <h2 className="display-4">{currentEvent.product_date ? moment(currentEvent.product_date).format("DD") : '-'} <span>{currentEvent.product_date ? moment(currentEvent.product_date).format("MMM") : '-'}</span></h2>
                                    </div>
                                    <div className="col-6 event-details">
                                        <h6>Starts at</h6>
                                        <h2 className="display-4">{currentEvent.product_start_time ? moment(currentEvent.product_start_time, 'hh:mm:ss').format("h") : '-'} <span>{currentEvent.product_start_time ? moment(currentEvent.product_start_time, 'hh:mm:ss').format("A") : '-'}</span></h2>
                                    </div>
                                    <div className="col-6 event-details">
                                        <h6>Seats left</h6>
                                        <h2 className="display-4">{currentEvent.product_remain_seats ? currentEvent.product_remain_seats : '-'}<span> /{currentEvent.product_total_seats ? currentEvent.product_total_seats : '-'}</span></h2>
                                    </div>
                                    <div className="col-6 event-details">
                                        <h6>Ends at</h6>
                                        <h2 className="display-4">{currentEvent.product_end_time ? moment(currentEvent.product_end_time, 'hh:mm:ss').format("h") : '-'} <span>{currentEvent.product_end_time ? moment(currentEvent.product_end_time, 'hh:mm:ss').format("A") : '-'}</span></h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-6">
                                <iframe src={currentEvent.product_event_map ? currentEvent.product_event_map : ''} style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" width="100%" height="450" frameBorder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Stats;