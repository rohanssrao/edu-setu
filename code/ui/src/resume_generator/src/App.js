import "antd/dist/antd.min.css";
import "./resume_template/resume.css";
import { Col, Row } from "antd";
import Resume from "./resume_components/resume";
import ResumeEntry from "./resume_components/resume_data_entry";
import React from "react";
import { Login } from "./login_components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 1,
      token: localStorage['token'],
      user_data: [],
      edu_data: [],
      skill_data: [],
      project_data: [],
      workExp_data: [],
      extra_data: []
      //TODO: hard code for now
    };
  }

  fetch_resume_data = () => {
    fetch("http://127.0.0.1:5000/api/get", {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }),
    })
      .then(response => response.json())
      .then(result => {
        return this.setState({
          data: result
        });
      });
  };
  componentDidMount() {
    this.fetch_resume_data();
  }
  //remove mached id from list
  delete_from_resume = (type, data) => {
    const id = data.id;
    const index = this.state[type].findIndex(e => e.id == id);
    let data_list = this.state[type];
    if (index !== -1) {
      data_list.splice(index, 1);
    }
    this.setState({
      [type]: data_list
    });
  };

  add_to_resume = data => {
    const entry_type = data[0];

    const entry_value = data[1];

    this.setState({
      [entry_type]: this.state[entry_type].concat([entry_value])
    });
  };

  
  render() {
   
    return (
      <div className="App">
        <header className="App-header">
          
                <Row gutter={[16, 16]}>
                  <Col
                    sm={24}
                    md={7}
                    style={{
                      overflow: "scroll",
                      height: "100vh"
                    }}
                  >
                    <ResumeEntry
                      data={this.state.data}
                      user_id={this.state.user_id}
                      add_to_resume={this.add_to_resume}
                      update_entry={this.fetch_resume_data}
                    />{" "}
                  </Col>{" "}
                  <Col sm={24} md={15}>
                    <Resume
                      delete_from_resume={this.delete_from_resume}
                      user_data={this.state.user_data}
                      edu_data={this.state.edu_data}
                      skill_data={this.state.skill_data}
                      project_data={this.state.project_data}
                      workExp_data={this.state.workExp_data}
                      extra_data={this.state.extra_data}
                    />{" "}
                  </Col>{" "}
                </Row>{" "}
              
        </header>{" "}
      </div>
    );
  }
}
export default App;
