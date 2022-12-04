import React from "react";
import { Card, Space, Button, Collapse, Modal, Form, Input } from "antd";
import { UserForm, EduForm } from "./submission_form";
import UserInfo from "./resume_data_entry_template/userInfo_entry";
import Education from "./resume_data_entry_template/education_entry";
import Skill from "./resume_data_entry_template/skill_entry";
import Project from "./resume_data_entry_template/project_entry";
import WorkExperience from "./resume_data_entry_template/workExperience_entry";
import Extra from "./resume_data_entry_template/extra_entry";
import Status from "./resume_data_entry_template/status";
import SubmissionModal from "./submissionModal";
import { send_data } from "../utils";
import { create_resume_data_entry } from "./resume_data_entry_template/data_entry_wrapper";

// import { getItems } from '../utils.js';
const { Panel } = Collapse;
/**
 * Select data for resume
 */
export default class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      select_data_id: null,
      is_fetching: true,
      user_data: [],
      edu_data: [],
      skill_data: [],
      workExp_data: [],
      project_data: [],
      extra_data: [],
      open_submission: false,
      current_type: null
    };
    this.close_submission = this.close_submission.bind(this);
  }



  generate_wrapper = (data, type, entry_component) => {
    if (data[type]) {
      let wrappers = []
      for (const e of data[type]) {
        const WrapedDataEntry = create_resume_data_entry(entry_component, e, type, this.props.add_to_resume)
        wrappers.push(<WrapedDataEntry />)
      }
      return wrappers
    }
    else {
      return <Status />
    }
  }

  add_to_display = () => {
    this.props.update_entry()
  }
  //add to side pannel
  read_data_from_form = values => {
    const type = this.state.current_type
    if (type === "skill_data") {
      values.contents = values.contents.split(" ")
    }
    send_data(this.state.user_id, this.state.current_type, values, this.add_to_display)

    // this.setState({ [type]: this.state[type].concat([values]) })
  };
  parse_data(data) {
    let parsed_data = {};
    parsed_data["user_data"] = null;
    parsed_data["edu_data"] = null;
    parsed_data["skill_data"] = null;
    parsed_data["project_data"] = null;
    parsed_data["extra_data"] = null;
    parsed_data["workExp_data"] = null;
    if (data) {
      data.forEach(element => {
        const category = element[0];
        const data_value = element[1];
        if ("user_data" === category) parsed_data.user_data = data_value;
        else if ("edu_data" === category) parsed_data.edu_data = data_value;
        else if ("skill_data" === category) parsed_data.skill_data = data_value;
        else if ("project_data" === category) parsed_data.project_data = data_value;
        else if ("extra_data" === category) parsed_data.extra_data = data_value;
        else if ("workexp_data" === category) parsed_data.workExp_data = data_value;
      });
    }

    return parsed_data;
  }
  //note for render components method
  //render from state variable which is though form submission
  // add from api which passed from App.js
  //open the submission model
  open_submission = (e, type) => {
    this.setState({ open_submission: true, current_type: type, user_id: this.props.user_id });
  };
  close_submission = () => {
    this.setState({ open_submission: false });
  };
  render() {
    let data = this.parse_data(this.props.data);

    const onChange = key => {
      //pass
    };
    return (
      <div id="resume_data_entry">
        {/* submission takes status indicating close or open the windows, recived data type and the function to recive data */}
        <SubmissionModal
          current_type={this.state.current_type}
          open_model={this.state.open_submission}
          close_submission={this.close_submission}
          get_submision_data={this.read_data_from_form}
        />
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="My Info" key="1">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "user_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'user_data', UserInfo)}
            </Space>
          </Panel>
          <Panel header="Education" key="2">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "edu_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'edu_data', Education)}
            </Space>
          </Panel>
          <Panel header="Skills" key="3">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "skill_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'skill_data', Skill)}
            </Space>
          </Panel>
          <Panel header="Work Experience" key="4">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "workExp_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'workExp_data', WorkExperience)}

            </Space>
          </Panel>
          <Panel header="Projects" key="5">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "project_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'project_data', Project)}
            </Space>
          </Panel>
          <Panel header="Extracurrisulum" key="6">
            <Button
              type="primary"
              block
              onClick={e => this.open_submission(e, "extra_data")}
            >
              Add New
            </Button>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              {this.generate_wrapper(data, 'extra_data', Extra)}
            </Space>
          </Panel>
        </Collapse>
        <Button
          type="primary"
          block
          onClick={e => (delete localStorage['token'])}
        >
          Logout
        </Button>
      </div>
    );
  }
}
