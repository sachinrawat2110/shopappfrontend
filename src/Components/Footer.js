import { Link } from "react-router-dom";

const Footer=()=>
{
    return(
        <>
        <div className="footer">
		<div className="container">
			<div className="w3_footer_grids">
				<div className="col-md-3 w3_footer_grid">
					<h3>Contact</h3>
					
					<ul className="address">
						<li><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i>V Mart, 4th block, <span>Jalandhar City.</span></li>
						<li><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i><a href="mailto:info@example.com">sachinrawatt00@gmail.com</a></li>
						<li><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>+91 6397336780</li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Information</h3>
					<ul className="info"> 
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/categories">About Us</Link></li>
						<li>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/contactus">Contact Us</Link></li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Category</h3>
					<ul className="info"> 
					    <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?cid=676a586b5b6f7bbb460ecd98">Clothes</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?cid=6762ff0713438f96102753d6">Electronics</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i> <Link to="/subcategories?cid=67582543722825492d628217">Grocery</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?cid=6762fcceefd971ab02fff632">Beverages</Link></li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Profile</h3>
					<ul className="info"> 
					<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/categories">Store</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/showcart">My Cart</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/login">Login</Link></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/signup">Create Account</Link></li>
					</ul>
					
					
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
		
		<div className="footer-copy">
			
			<div className="container">c
				<p>© 2025 Super Market. All rights reserved | Design by <a href="http://w3layouts.com/">Sachin Rawat</a></p>
			</div>
		</div>
		
	</div>	
	<div className="footer-botm">
			<div className="container">
				<div className="w3layouts-foot">
					<ul>
						<li><a href="#" className="w3_agile_facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
						<li><a href="#" className="agile_twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
						<li><a href="#" className="w3_agile_dribble"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
						<li><a href="#" className="w3_agile_vimeo"><i className="fa fa-vimeo" aria-hidden="true"></i></a></li>
					</ul>
				</div>
				<div className="payment-w3ls">	
					<img src="images/card.png" alt=" " className="img-responsive"/>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
        </>
    )
}
export default Footer;