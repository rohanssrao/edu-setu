import React, { Component } from "react";
import { Form, Input, Button, Typography, Select, message, InputNumber } from "antd";
import "../Login/Login.css";
const { Title } = Typography;
const { Option } = Select;

export class AddNewPosting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationQuestions: 1,
      gpaRequirement: false,
      degreeRequirement: "",
      jobType: "",
    };
  }

  onTypeChange = (type) => {
    console.log(type);
    this.setState({ jobType: type });
  };

  onDegreeChange = (type) => {
    console.log(type);
    this.setState({ degreeRequirement: type });
  };
  errorMessage = (text) => {
    message.destroy(text);
    let config = { content: text, duration: 2, key: text };
    message.error(config);
  }

  alterApplicationQuestions = (value) => {
    this.setState((prevState) => {
      if (prevState.applicationQuestions + value < 0) {
        this.errorMessage("No question to remove!");
        return prevState;
      }
      else if (prevState.applicationQuestions + value > 10) {
        this.errorMessage("You can only have 10 questions per posting!");
        return prevState;
      }
      return {
        applicationQuestions: prevState.applicationQuestions + value
      }
    });
  }
  onSubmitAddPosting = () => {
    this.props.formRef.current.validateFields().then((values) => {
      values.professor = sessionStorage.getItem("user_id");
      this.props.submitAddPosting(values);
    });
  }
  async updateGpaRequirement() {
    this.setState({ gpaRequirement: true });
  };
  render() {
    return (
      <Form
        ref={this.props.formRef}
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
        onFinish={this.onSubmitAddPosting}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input a title.",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="job_type"
          label="Job Type"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select the job type",
            },
          ]}>
          <Select
            onChange={this.onTypeChange}
            placeholder="This is a..."
          >
            <Option key="internship" value="Internship">
              Internship
            </Option>
            <Option key="co-op" value="Co-op">
              Co-op
            </Option>
            <Option key="ft-entry" value="Full Time Entry Level">
              Full Time Entry Level
            </Option>
            <Option key="ft-experienced" value="Full Time Experienced">
              Full Time Experienced
            </Option>
            <Option key="part-time" value="Part Time">
              Part Time
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please describe this posting.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Provide a brief description"
            rows={8}
          />
        </Form.Item>
        <Form.Item
          label="Prerequisites"
          name="prerequisites"
          rules={[
            {
              required: true,
              message:
                "Please specify the prerequisite skills/qualifications for this role.",
            },
          ]}
        >
          <Input.TextArea
            rows={8}
            placeholder="Describe desired skills and qualifications"
          />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select a location",
            },
          ]}
        >
          <Select placeholder="Where would the student work?">
            <Option key="In Person" value="In Person">
              In Person
            </Option>
            <Option key="Remote" value="Remote">
              Remote
            </Option>
            <Option key="Hybrid" value="Hybrid">
              Hybrid
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="gpa" label="GPA Requirement" >
          <InputNumber min={0} max={4} step={0.1} />
        </Form.Item>
        <Form.Item name="degree" label="Degree Requirement">
          <Select
            mode="multiple"
            style={{ width: '50%' }}
            placeholder="Select degree"
            onChange={this.onDegreeChange}
            options={[{ value: "Bachelor's", key: "Bachelor's" },
            { value: "Master's", key: "Master's" },
            { value: "Ph.D.", key: "Ph.D." }]}
          />
        </Form.Item>

        {[...Array(this.state.applicationQuestions)].map((_, idx) => {
          return (
            <div key={"app" + idx} >
              <Form.Item
                label={"Application Question " + (idx + 1) + " :"}
                name={"application question " + idx}
                rules={[
                  {
                    required: false
                  }
                ]}
              >
                <Input.TextArea
                  placeholder="Provide any questions you want applicants to answer."
                  rows={4}
                />
              </Form.Item>
            </div>);
        })}
        <Button block danger onClick={() => this.alterApplicationQuestions(-1)}>
          Remove Application Question
        </Button>
        <Button block onClick={() => this.alterApplicationQuestions(1)}>
          Add Application Question
        </Button>
        <Button
          style={{ marginLeft: "15px", float: "right" }}
          type="primary"
          htmlType="submit"
          loading={this.props.loadingAddPosting}
        >
          Submit
        </Button>
        <Button
          type="link"
          style={{ marginLeft: "15px" }}
          onClick={() => {
            this.props.formRef.current?.resetFields();
          }}
        >
          Reset Form
        </Button>
      </Form>
    );
  }
}

export default AddNewPosting;
