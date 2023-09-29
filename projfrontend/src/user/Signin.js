import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
	const signinForm = () => {
		return (
			<div className="row">
				<div className="col-6 offset-sm-3 text-left">
					<form action="">
						<div className="form-group">
							<label htmlFor="" className="text-light">
								Email
							</label>
							<input type="email" className="form-control" />
						</div>
						<div className="form-group">
							<label htmlFor="" className="text-light">
								Password
							</label>
							<input type="password" className="form-control" />
						</div>
						<button
							type="submit"
							className="btn btn-success btn-block w-100 mt-3">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<Base title="Sign In page" description="A page for user to sign in!">
			{signinForm()}
		</Base>
	);
};

export default Signin;
