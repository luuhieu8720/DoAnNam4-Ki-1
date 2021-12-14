import React from "react";
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import {ROUTES, ROUTES_PRIVATE} from './routes';
import Header from './components/Header/Header';
import FormLogin from './components/Auth/components/FormLogin';
import { useSelector } from "react-redux";


function App() {

	const token = useSelector(state => state.Auth ? state.Auth.token : "");

	return (
		<Router>
			<div className="">
				<Header />
				<div className="w-full">
					{
						showContentMenus(ROUTES)
					}
					{
						showContentMenusPrivate(ROUTES_PRIVATE, token)
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

const showContentMenusPrivate = (routes, token) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact={route.exact}
				element={token ? route.main : <FormLogin />}
			/>)

		})
	}
	return <Routes>{result}</Routes>
}

export default App;