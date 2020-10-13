import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerWidget1: [],
            footerWidget2: []
        };
    }

    componentDidMount() {
		this.fetchFooterWidget1();
		this.fetchFooterWidget2();

	}
	
	fetchFooterWidget1() {
		var query = `
                    query ActivityById($id: ID!){
                        footerLinks(where:{id:$id}){
                            id,
														footer{
															id,
															menu_name,
															menu_link
														}
                        }
                    }
                    `;
        var variables = {
            "id": 1
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let homeBanner = response.data.footerLinks[0];
                //console.log(homeBanner); 
                this.setState({
                    footerWidget1: homeBanner.footer
                });
            });

        //console.log(homeBannerData);
	}

	fetchFooterWidget2() {
		var query = `
                    query ActivityById($id: ID!){
                        footerLinks(where:{id:$id}){
                            id,
							footer{
								id,
								menu_name,
								menu_link
							}
                        }
                    }
                    `;
        var variables = {
            "id": 2
        }
        fetch(process.env.GRAPHURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            })
            .then(response => response.json())
            .then((response) => {
                //console.log(response);
                let homeBanner = response.data.footerLinks[0];
                //console.log(homeBanner); 
                this.setState({
                    footerWidget2: homeBanner.footer
                });
            });

        //console.log(homeBannerData);
	}

    render(){
		const { footerWidget1, footerWidget2 } = this.state;
  		return (
			<>
			<footer className="pb-4 text-light" id="footer">
				<div className="container">
					<div className="row mb-7">
						<div className="col-md-4 col-sm-12 mb-3">
							<div className="fw1-widget">
								<img className="mb-7" src="/assets/images/footer-gif.gif" />
								<div className="fw4-widget mobile-none">
									<h4 className="fw4-title">Sign up for Newsletter</h4>
									<div id="mc_embed_signup" style={{ clear: 'left',fontSize: '14px Helvetica,Arial,sans-serif' }}>
										<form action="https://team.us17.list-manage.com/subscribe/post?u=4032b67d61a6c1d995bcc8f96&amp;id=6a93ff53c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
											<div id="mc_embed_signup_scroll">
												<h2>Subscribe</h2>
												<div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
												<div className="mc-field-group mc4wp-form-fields">
													<label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
													<p><input type="email" placeholder="Email Address"  name="EMAIL" className="required email" id="mce-EMAIL"/></p>
													<div id="mce-responses" className="clear">
														<div className="response" id="mce-error-response" style={{display:'none'}}></div>
														<div className="response" id="mce-success-response" style={{display:'none'}}></div>
													</div>
													<div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
														<input type="text" name="b_4032b67d61a6c1d995bcc8f96_6a93ff53c0" tabIndex="-1" value="" readOnly/>
													</div>    
													<p><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></p>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>   
						</div> 
						<div className="col-md-2 col-sm-12 mb-3">

						</div>
						<div className="col-md-2 col-sm-12 mb-3 w-mobile-50">
							<h6 className="fw1-title font-weight-bold">Kidocode</h6>
							<div className="menu-footer-1-container">
								<ul id="menu-footer-1" className="menu">
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-48">
										<a href="#" aria-current="page">Home</a>
									</li>
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-51">
										<a href="#">Pricing</a>
									</li>
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-49">
										<a href="#">About</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-2 col-sm-12 mb-3 w-mobile-50">
							<div className="fw2-widget">
								<h6 className="fw2-title font-weight-bold">Quick Links</h6>
								<div className="menu-footer-2-container">
									<ul id="menu-footer-2" className="menu">
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-102">
											<a href="#">KPortal</a>
										</li>
										<li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-104">
											<a href="#">Investors</a>
										</li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-103">
											<a href="#">Schools</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-2 col-sm-12 mb-3">
							<h6 className="fw1-title font-weight-bold">Kidocode</h6>
							<div className="menu-footer-1-container">
								<ul id="menu-footer-1" className="menu">
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-48">
										<a href="#" aria-current="page">Home</a>
									</li>
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-51">
										<a href="#">Pricing</a>
									</li>
									<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-49">
										<a href="#">About</a>
									</li>
								</ul>
							</div>                        
						</div>

						<div className="col-md-4 col-sm-12 mb-3 desktop-none mt-4">
							<div className="fw1-widget">
								<div className="fw4-widget">
									<h4 className="fw4-title">Sign up for Newsletter</h4>
									<div id="mc_embed_signup" style={{ clear: 'left',fontSize: '14px Helvetica,Arial,sans-serif' }}>
										<form action="https://team.us17.list-manage.com/subscribe/post?u=4032b67d61a6c1d995bcc8f96&amp;id=6a93ff53c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
											<div id="mc_embed_signup_scroll">
												<h2>Subscribe</h2>
												<div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
												<div className="mc-field-group mc4wp-form-fields">
													<label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
													<p><input type="email" placeholder="Email Address"  name="EMAIL" className="required email" id="mce-EMAIL"/></p>
													<div id="mce-responses" className="clear">
														<div className="response" id="mce-error-response" style={{display:'none'}}></div>
														<div className="response" id="mce-success-response" style={{display:'none'}}></div>
													</div>
													<div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
														<input type="text" name="b_4032b67d61a6c1d995bcc8f96_6a93ff53c0" tabIndex="-1" value="" readOnly/>
													</div>    
													<p><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></p>
												</div>
											</div>
										</form>
									</div>
								</div>   
							</div> 
						</div>
					</div>
					<div className="row justify-content-start mb-2 social-icons-sec">
						<div className="col-auto">
							<ul className="nav">
								<li className="nav-item">
										<a href="https://www.facebook.com/KidoCode/" target="_blank" className="nav-link pl-0">
											<img src="/assets/images/facebook.svg" />    
										</a>
								</li>
								<li className="nav-item">
										<a href="https://instagram.com/kidocode" target="_blank" className="nav-link pl-0">
											<img src="/assets/images/instagram.svg" />    
										</a>
								</li>
								<li className="nav-item">
										<a href="https://twitter.com/kidocode" target="_blank" className="nav-link pl-0">
											<img src="/assets/images/twitter.svg" />    
										</a>
								</li>
								<li className="nav-item">
										<a href="#" target="_blank" className="nav-link pl-0">
											<img src="/assets/images/youtube.svg" />    
										</a>
								</li>
								<li className="nav-item">
										<a href="#" target="_blank" className="nav-link pl-0">
											<img src="/assets/images/medium.svg" />    
										</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row justify-content-start">
							<div className="col col-md-auto text-center">
									<small className="text-muted">&#169;2001-2020 All Right Reserved. Kidocode&#169;</small>
							</div>
					</div>
				</div>
			</footer>
			{/*
			<footer className="pb-4 text-light" id="footer">
				<div className="container">
					<div className="row mb-7">
						<div className="col-md-5 col-sm-12 mb-3">
							<div className="fw1-widget">
								<img className="mb-7" src="/assets/images/footer-gif.gif"/>
								<h5 className="fw4-widget mobile-none">Newsletter</h5>
								<div id="mc_embed_signup" style={{ clear: 'left',fontSize: '14px Helvetica,Arial,sans-serif' }}>
									<form action="https://team.us17.list-manage.com/subscribe/post?u=4032b67d61a6c1d995bcc8f96&amp;id=6a93ff53c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
										<div id="mc_embed_signup_scroll">
											<h2>Subscribe</h2>
											<div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
											<div className="mc-field-group mc4wp-form-fields">
												<label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
												<p><input type="email" placeholder="Email Address"  name="EMAIL" className="required email" id="mce-EMAIL"/></p>
												<div id="mce-responses" className="clear">
													<div className="response" id="mce-error-response" style={{display:'none'}}></div>
													<div className="response" id="mce-success-response" style={{display:'none'}}></div>
												</div>
												<div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
													<input type="text" name="b_4032b67d61a6c1d995bcc8f96_6a93ff53c0" tabIndex="-1" value="" readOnly/>
												</div>    
												<p><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></p>
											</div>
								    </div>
									</form>
								</div>
							</div>                            
						</div>
						<div className="col-md-1 col-sm-12 mb-3" />
						<div className="col-md-2 col-sm-12 mb-3 w-mobile-50">
							<div className="fw1-widget">
								<h5 className="fw1-title">Kidocode</h5>
								<div className="menu-footer-1-container">
									<ul id="menu-footer-1" className="menu">
										{
											footerWidget1.length > 0 &&
											footerWidget1.map((footerlink, index) => {
												return (
													<li key={index} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-48">
														<a href={footerlink.menu_link} aria-current="page">{footerlink.menu_name}</a>
													</li>
												)
											})
										}
									</ul>
								</div>
							</div> 
						</div>
						<div className="col-md-2 col-sm-12 mb-3 w-mobile-50">
							<div className="fw2-widget">
								<h5 className="fw2-title">Quick Links</h5>
								<div className="menu-footer-2-container">
									<ul id="menu-footer-2" className="menu">
										{
											footerWidget2.length > 0 &&
											footerWidget2.map((footerlink, index) => {
												return (
													<li key={index} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-48">
														<a href={footerlink.menu_link} aria-current="page">{footerlink.menu_name}</a>
													</li>
												)
											})
										}
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-start mb-2 social-icons-sec">
						<div className="col-auto">
							<ul className="nav">
								<li className="nav-item">
									<a href="https://www.facebook.com/KidoCode/" target="_blank" className="nav-link pl-0">
										<img src="/assets/images/facebook.svg" />    
									</a>
								</li>
								<li className="nav-item">
									<a href="https://instagram.com/kidocode" target="_blank" className="nav-link pl-0">
										<img src="/assets/images/instagram.svg" />    
									</a>
								</li>
								<li className="nav-item">
									<a href="https://twitter.com/kidocode" target="_blank" className="nav-link pl-0">
										<img src="/assets/images/twitter.svg" />    
									</a>
								</li>
								<li className="nav-item">
									<a href="#" target="_blank" className="nav-link pl-0">
										<img src="/assets/images/youtube.svg" />    
									</a>
								</li>
								<li className="nav-item">
									<a href="#" target="_blank" className="nav-link pl-0">
										<img src="/assets/images/medium.svg" />    
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row justify-content-start">
						<div className="col col-md-auto text-center">
							<small className="text-muted">&#169;2001-2020 All Right Reserved. Kidocode&#169;</small>
						</div>
					</div>
				</div>
			</footer>*/}

			<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.0.4/popper.js"></script>
			<script type="text/javascript" src="/assets/js/bootstrap.js"></script>
			<script type="text/javascript" src="/assets/js/aos.js"></script>
			<script type="text/javascript" src="/assets/js/jquery.countdown.min.js"></script>
			<script type="text/javascript" src="/assets/js/jarallax.min.js"></script>
			<script type="text/javascript" src="/assets/js/jarallax-element.min.js"></script>
			<script type="text/javascript" src="/assets/js/jarallax-video.min.js"></script>
			<script type="text/javascript" src="/assets/js/jquery.fancybox.min.js"></script>
			<script type="text/javascript" src="/assets/js/flatpickr.min.js"></script>
			<script type="text/javascript" src="/assets/js/theme.js"></script>
			<script type="text/javascript" src="/assets/js/scrollMonitor.js"></script>
			<script type="text/javascript" src="http://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
			<script type="text/javascript" src="/assets/js/footer-script.js"></script>
			{/*
			<script type="text/javascript" src="/assets/js/flickity.pkgd.min.js"></script>
			*/}
			</>
		  )
	}
}

export default Footer;