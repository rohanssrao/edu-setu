import React from "react";
import { Modal } from "antd";
import { UserForm, EduForm, SkillForm, WorkExpForm, ProjectForm, ExtraForm } from "./submission_form";

export default class SubmissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      not_used: null
    };
  }

  showModal = () => {
    // this.setState({is_model_open: true})
  };
  handleOk = () => {
    // this.setState({is_model_open: false})
    this.props.close_submission();
  };
  handleCancel = () => {
    // this.setState({is_model_open: false})
    this.props.close_submission();
  };

  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  get_form_by_type() {
    const type = this.props.current_type;

    if (type === "user_data")
      return <UserForm get_submision_data={this.props.get_submision_data} />;
    else if (type === "edu_data")
      return <EduForm get_submision_data={this.props.get_submision_data} />;
    else if (type === "skill_data")
      return <SkillForm get_submision_data={this.props.get_submision_data} />;
    else if (type === 'workExp_data')
      return <WorkExpForm get_submision_data={this.props.get_submision_data} />;
    else if (type === 'project_data')
      return <ProjectForm get_submision_data={this.props.get_submision_data} />;
    else if (type === 'extra_data')
      return <ExtraForm get_submision_data={this.props.get_submision_data} />;
    else return <p>No From For This Type</p>;
  }

  render() {
    return (
      <Modal
        title="Basic Modal"
        open={this.props.open_model}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {this.get_form_by_type()}
      </Modal>
    );
  }
}
