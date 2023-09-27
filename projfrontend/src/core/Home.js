import React from "react";
import "../styles.css";
import { API } from "../backend";

const Home = () => {
	console.log("API IS ", API);
	return <h1 className='text-white'>This is the Home component</h1>;
};

export default Home;
