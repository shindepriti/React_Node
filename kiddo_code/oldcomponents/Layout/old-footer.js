import React, {Component} from 'react';
const fetch = require('isomorphic-fetch');
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
  });

  return (
    <div id="mc4wp-form-1" className="mc4wp-form mc4wp-form-92" data-id="92" data-name="Subscribe">
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
			<div className="mc4wp-form-fields">
				<p>
					<input type="email" ref={node => (email = node)} placeholder="Email Address" required />
				</p>
				<p>
					<input type="button" value="Subscribe"  onClick={submit} />
				</p>
			</div>
    </div>
  );
};

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
			//const url = 'https://us17.admin.mailchimp.com/templates/share?id=142506857_3c5d7f782e24736ea1b5_us17';
			const url = 'https://us17.list-manage.com/subscribe/post?id=6a93ff53c0';
  		return (
				<>
				<footer className="pb-4 text-light" id="footer">
					<div className="container">
						<div className="row mb-7">
							<div className="col-md-5 col-sm-12 mb-3">
								<div className="fw1-widget">
									<img className="mb-7" src="/assets/images/footer-gif.gif"/>
									<h5 className="fw4-widget mobile-none">Newsletter</h5>
									<MailchimpSubscribe
										url={url}
										render={({ subscribe, status, message }) => (
											<>
												<CustomForm 
													status={status}
													message={message}
													onValidated={formData => subscribe(formData)} />
											</>
										)}
									/>
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
				{/*
				<script type="text/javascript" src="/assets/js/flickity.pkgd.min.js"></script>
				*/}
				</>
		  )
	}
}

export default Footer;