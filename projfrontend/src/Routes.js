import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
			</Routes>
			<Routes>
				<Route path="/signup" element={<Signup />}></Route>
			</Routes>
			<Routes>
				<Route path="/signin" element={<Signin />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
