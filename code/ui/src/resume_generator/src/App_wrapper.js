//need to authenticate first before acessing other page
import "antd/dist/antd.css";
import App from "./App"
import React from "react";
import { Login } from "./login_components/login";

export class AppWrapper extends React.Component {

  save_credential = async response => {
    const status = response.status;
    //sucess 200
    if (status === 200) {
      const json_response = await response.json();
      // console.log("login\n ")
      // console.log("here is token " + json_response.access_token)
      localStorage.setItem("token", json_response.access_token);
      this.setState({ token: json_response.access_token });
    } else if (status === 400) {
      console.log("user name or password not correct");
    }
  };
  on_finish_login = values => {
    const password = values.password;
    const email = values.email;
    //request token
    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    }).then(response => this.save_credential(response));
  };

  render(){
    if (! localStorage.token){
        return <Login  onFinish={this.on_finish_login} />
    }
    else{
        return <App />
    }
  }
}
