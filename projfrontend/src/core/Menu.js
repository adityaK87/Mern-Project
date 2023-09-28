import React from "react";
import { Link, useLocation } from "react-router-dom";

//This is a higher order function
const withLocation = (Menu) => (props) => {
	const location = useLocation();
	return true ? <Menu {...props} location={location} /> : "";
};

const currentTab = (location, path) => {
	if (location === path) {
		return {
			color: "#ffffff",
		};
	} else {
		return {
			color: "#d1d1d1",
		};
	}
};

const Menu = ({ location }) => {
	return (
		<div>
			<ul className="nav nav-tabs bg-dark">
				<li className="nav-item">
					<Link
						style={currentTab(location.pathname, "/")}
						className="nav-link"
						to="/">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(location.pathname, "/cart")}
						className="nav-link"
						to="/cart">
						Cart
					</Link>
				</li>

				<li className="nav-item">
					<Link
						style={currentTab(location.pathname, "/user/dashboard")}
						className="nav-link"
						to="/user/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(
							location.pathname,
							"/admin/dashboard"
						)}
						className="nav-link"
						to="/admin/dashboard">
						A. Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link
						className="nav-link"
						style={currentTab(location.pathname, "/signup")}
						to="/signup">
						Signup
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(location.pathname, "/signin")}
						className="nav-link"
						to="/signin">
						Signin
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(location.pathname, "/signout")}
						className="nav-link"
						to="/signout">
						signout
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withLocation(Menu);
