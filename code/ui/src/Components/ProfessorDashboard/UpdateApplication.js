import React, { Component } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import "../Login/Login.css";
const { Title } = Typography;
const { Option } = Select;

export class UpdateApplication extends Component {
  constructor(props) {
    super(props);
  }
  onSubmitUpdateApplication = () => {
    this.props.updateFormRef.current.validateFields().then((values) => {
      values.application_id = this.props.updateApplicantData.application_id;
      this.props.submitUpdateApplication(values);
    });
  };
  componentDidMount() {
    this.props.populateUpdateData();
  }
  componentDidUpdate() {
    this.props.populateUpdateData();
  }
  render() {
    return (
      <Form
        ref={this.props.updateFormRef}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 30,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={this.onSubmitUpdateApplication}
      >
        <Form.Item label="Student Name" name="student_display_name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Email" name="student_email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student GPA" name="student_gpa">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Major" name="student_major">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Minor" name="student_minor">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Year" name="student_year">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Phone" name="student_phone">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Student Skills" name="student_skills">
          <Input disabled />
        </Form.Item>
        {this.props.responses.map((response, idx)=>{
          let question = response.question;
          let response_value = response.response;
          return (
          <>
            <Form.Item label={question} >
              <Input value={response_value} disabled />
            </Form.Item>
          </>);
          })}
        <Form.Item name="status" label="Status">
          <Select>
            <Option key="pending" value="pending">
              Pending
            </Option>
            <Option key="in_progress" value="in_progress">
              In Progress
            </Option>
            <Option key="selected" value="selected">
              Selected
            </Option>
            <Option key="rejected" value="rejected">
              Rejected
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Remarks" name="remarks">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginLeft: "15px", float: "right" }}
            type="primary"
            htmlType="submit"
            loading={this.props.loadingUpdateApplication}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateApplication;
