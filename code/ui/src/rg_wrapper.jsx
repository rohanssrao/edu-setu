import React from "react";
import { AppWrapper } from "./resume_generator/src/App_wrapper";
import NavBar from "./Components/studentdashboard/navbar";
import { Space } from "antd";
// just need to wrap the resume geneartor with the nav bar
export class RGWrapper extends React.Component {
  constructor(props) {
    super(props);
    //init state 0 -> verify if token valid
    this.state = {
      status: 0,
      timeout: 0,
    };
  }

  //verify token
  verify_token = () => {
    const token = localStorage.token;
    if (token) {
      fetch("http://127.0.0.1:5000/api/protected", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({}),
      }).then((response) => {
        if(response.status === 405){
          this.setState({status:1})
        }
        else{
          this.setState({status:4})
        }
        console.log(response.status);
      });
    } else {
      this.setState({ status: 1 });
    }
  };
  //helping method to save token
  save_credential = async (response) => {
    const status = response.status;
    if (status === 200) {
      const json_response = await response.json();
      localStorage.token = json_response.access_token;
      this.setState({ status: 4 });
    } else if (status === 400) {
      console.log("user name or password no match");
      console.log("register as new user");
      this.setState({ status: 2 });
    }
  };

  //request token
  request_token = () => {
    const email = localStorage.email;
    const password = localStorage.password;

    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      this.save_credential(response);
    });
  };
  register_user = () => {
    const username = localStorage.username;
    const email = localStorage.email;
    const password = localStorage.password;
    if (this.state.timeout < 4) {
      fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }).then((response) => {
        this.save_credential(response);
        this.state.set({timeout:this.state.timeout + 1})
      });
    }
  };
  initlization = () => {
    if (this.state.status === 0) {
      this.verify_token();
    } else if (this.state.status === 1) {
      this.request_token();
    } else if (this.state.status === 2) {
      this.register_user();
    }
  };
  render() {
    this.initlization();
    // const Navbar = NavBar()
    let ResumeApp = null
    if(this.state.status === 4){
      ResumeApp = <AppWrapper/>
    }
    else{
      ResumeApp = <h1> Loading </h1>
    }
    if (this.state.status > 3){
      ResumeApp = <React.Fragment> 
        <h1> Loading Failed </h1>
        <p> email exist and password doesn't match</p>
        </React.Fragment>
    }
    return (
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <NavBar />
        {ResumeApp}
      </Space>
    );
  }
}
