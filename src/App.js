import React from "react";
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import ROUTES from './routes';
import Header from './components/Header/Header';


function App() {

	return (
		<Router>
			<div className="">
				<Header />
				<div className="">
					{
						showContentMenus(ROUTES)
					}
				</div>
			</div>
		</Router>
	);
}

const showContentMenus = (routes) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact={route.exact}
				element={route.main}
			/>)

		})
	}
	return <Routes>{result}</Routes>
}

export default App;