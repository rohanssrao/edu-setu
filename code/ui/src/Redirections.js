import React, { Component } from "react";

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
import { StudentProfile } from "./Components/studentdashboard/studentProfile";
import TrackApplication from "./Components/studentdashboard/trackapplication";
import { StudentHomePage } from "./Components/studentdashboard";

export default class Redirections extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display_name: "",
		};
	}

	authGuard = (Component) => () => {
		return sessionStorage.getItem("loggedIn") === "true" ? <Component /> : <Redirect to="/auth" />;
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/student/home">
						<StudentHomePage />
					</Route>
					<Route exact path="/student/trackApplications">
						<TrackApplication />
					</Route>
					<Route exact path="/student/myProfile">
						<StudentProfile />
					</Route>
					<Route path="/professor" render={this.authGuard(Home)}></Route>
					<Route path="/auth">
						<Login />
					</Route>
					{/* <Route path="/resetPassword">
                        <ResetPassword></ResetPassword>
                    </Route> */}

					<Route exact path="/">
						<Redirect to="/auth"></Redirect>
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		);
	}
}
