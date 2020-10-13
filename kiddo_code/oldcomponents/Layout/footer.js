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
						<div className="col-md-5 col-sm-12 mb-3">
							<div className="fw1-widget">
								<img className="mb-7" src="assets/images/footer-gif.gif"/>
								{/* <h5 className="fw4-widget mobile-none">Newsletter</h5> */}
								<div id="mc_embed_signup" style={{ clear: 'left',fontSize: '14px Helvetica,Arial,sans-serif' }}>
								<form action="https://team.us17.list-manage.com/subscribe/post?u=4032b67d61a6c1d995bcc8f96&amp;id=6a93ff53c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate mobile-none" target="_blank" novalidate>
								    <div id="mc_embed_signup_scroll">
									<h2>Sign up for Newsletter</h2>
								<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
								<div class="mc-field-group mc4wp-form-fields">
									{/* <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
								</label> */}
									<input type="email"  name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email Address"/>
								</div>
									<div id="mce-responses" class="clear">
										<div class="response" id="mce-error-response" style={{display:'none'}}></div>
										<div class="response" id="mce-success-response" style={{display:'none'}}></div>
									</div>    
								    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_4032b67d61a6c1d995bcc8f96_6a93ff53c0" tabindex="-1" value=""/></div>
								    <div class="clear mt-2 mc4wp-form-fields"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"/></div>
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
						<div className="col-md-12 desktop-none mt-4 mb-3">
							<form action="https://team.us17.list-manage.com/subscribe/post?u=4032b67d61a6c1d995bcc8f96&amp;id=6a93ff53c0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
								    <div id="mc_embed_signup_scroll">
									<h2>Sign up for Newsletter</h2>
								<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
								<div class="mc-field-group mc4wp-form-fields">
									{/* <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
								</label> */}
									<input type="email"  name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email Address"/>
								</div>
									<div id="mce-responses" class="clear">
										<div class="response" id="mce-error-response" style={{display:'none'}}></div>
										<div class="response" id="mce-success-response" style={{display:'none'}}></div>
									</div>    
								    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_4032b67d61a6c1d995bcc8f96_6a93ff53c0" tabindex="-1" value=""/></div>
								    <div class="clear mt-2 mc4wp-form-fields"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"/></div>
								    </div>
								</form>
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