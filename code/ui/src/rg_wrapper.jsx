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
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        })
      }).then((response) => {
        if(response.status === 200){
          this.setState({status:4})
          console.log("token verified")
        }
        else{
          this.setState({status:1})
          console.log("verification failed, request a new token")
        }
        
      });
    } else {
      this.setState({ status: 1 });
      console.log("token not found request a new token")
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
      if(this.state.status === 2){
        console.log("user name or password no match");
        this.setState({status:5}) //failed
      }
      else{
        this.setState({ status: 2 });
      }
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
      });
    }
  };
  initlization = () => {
    if (this.state.status === 0) {
      this.verify_token();
      console.log("verify token")
    } else if (this.state.status === 1) {
      this.request_token();
      console.log("request new token")
    } else if (this.state.status === 2) {
      this.register_user();
      console.log("user doesn't exist, create new user")
    }
  };
  componentDidMount(){
    this.initlization()
  }
  componentDidUpdate(){
    console.log("initlization")
    if(this.state !== 4 || this.state !==5){
      this.initlization()
    }
   
  }
  render() {
    // this.initlization();
    // const Navbar = NavBar()
    let ResumeApp = null
    if(this.state.status === 4){
      ResumeApp = <AppWrapper/>
    }
    else{
      ResumeApp = <h1> Loading </h1>
    }
    if (this.state.status ===5){ //fail
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
