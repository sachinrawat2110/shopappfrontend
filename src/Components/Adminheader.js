import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authslice";

const Adminheader=()=>
{
    const {pname} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
	const navigate=useNavigate();

	const onlogout=()=>
	{
		dispatch(logout());
		navigate("/")
		sessionStorage.clear();
	}
    return(
        <>
        <div className="agileits_header">
		<div className="container">
			<div className="w3l_offers">
               {
				<p>Welcome {pname}</p>
			   }
			</div>
			<div className="agile-login">
				<ul>
						<li><Link to="/changePass">Change Password</Link></li>
						<li><button className="btn btn-primary" onClick={onlogout}>Logout</button></li>
				</ul>
			</div>
			<div className="product_list_header">  
					
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="logo_products">
		<div className="container">
		<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>
					
				</ul>
			</div>
			<div className="w3ls_logo_products_left">
				<h1><a href="index.html">super Market</a></h1>
			</div>
		<div className="w3l_search">
			<form action="#" method="post">
				<input type="search" name="Search" placeholder="Search for a Product..." required=""/>
				<button type="submit" className="btn btn-default search" aria-label="Left Align">
					<i className="fa fa-search" aria-hidden="true"> </i>
				</button>
				<div className="clearfix"></div>
			</form>
		</div>
			
			<div className="clearfix"> </div>
		</div>
	</div>

    <div className="navigation-agileits">
                <div className="container">
                    <nav className="navbar navbar-default">

                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li className="active"><Link to="/adminhome" className="act">Home</Link></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Manage<b className="caret"></b></a> 
                                    <ul className="dropdown-menu multi-column columns-3">
                                        <div className="row">
                                            <div className="multi-gd-img">
                                                <ul className="multi-column-dropdown">
                                                    <p>Manage All</p>
                                                    <li><Link to="/Managecategory">Category</Link></li>
                                                    <li><Link to="/SubmanageCat">Sub Category</Link></li>
                                                    <li><Link to="/Manageproduct">Product</Link></li>
                                                    <li><Link to="/Createadmin">Create Admin</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">View<b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-column columns-3">
                                        <div className="row">
                                            <div className="multi-gd-img">
                                                <ul className="multi-column-dropdown">
                                                    <h6>View All</h6>
                                                    <li><Link to="/search">Search User</Link></li>
                                                    <li><Link to="/listuser">List of Members</Link></li>
                                                    <li><Link to="/vieworders">Orders</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    );
}
export default Adminheader;