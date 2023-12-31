import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

const Home = () => {
	console.log("API IS ", API);
	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store!">
			<h1 className="text-white">This is the Home component</h1>
			<div className="row">
				<div className="col-4">
					<button className="btn btn-success">TEST</button>
				</div>

				<div className="col-4">
					<button className="btn btn-success">TEST</button>
				</div>
				<div className="col-4">
					<button className="btn btn-success">TEST</button>
				</div>
			</div>
		</Base>
	);
};

export default Home;
