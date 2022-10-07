import React, { Component } from "react";

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// import ResetPassword from "./Pages/Login/ResetPassword";

export default class Redirections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: ""
        }
    }

    authGuard = (Component) => () => {
        return sessionStorage.getItem("loggedIn") === "true" ? (
            <Component />
        ) : (
            <Redirect to="/auth" />
        );
    };

    render() {
        console.log(this.state);
        return (
            < Router >
                <Switch>
				<Route path="/professor" render={this.authGuard(Home)}></Route>
                    <Route path="/auth">
                        <Login  />
                    </Route>
                    {/* <Route path="/resetPassword">
                        <ResetPassword></ResetPassword>
                    </Route> */}
                   
                    <Route exact path="/">
						<Redirect to="/auth"></Redirect>
                    </Route>
                    <Route path="*"><NotFound/></Route>
                </Switch>
            </Router >
        )
    }
}