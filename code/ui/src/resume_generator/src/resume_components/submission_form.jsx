import React from "react";
import { Button, Checkbox, Form, Input, } from "antd";

export class UserForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "user_info"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "Please input your website!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        {/* this is used to tell which type of data  */}
        <Form.Item hidden name="type">
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export class EduForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "edu_info"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="School Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input school name"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input location"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Program"
          name="program"
          rules={[
            {
              required: true,
              message: "Please input prgram"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="GPA"
          name="gpa"
          rules={[
            {
              required: true,
              message: "Please input gpa"
            }
          ]}
        >
          <Input />
        </Form.Item>
        {/* this is used to tell which type of data  */}
        <Form.Item hidden name="type">
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export class WorkExpForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    const { TextArea } = Input;
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "edu_info"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Job Title"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input job Title"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input location"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contents"
          name="contents"
          rules={[
            {
              required: true,
              message: "Please input prgram"
            }
          ]}
        >
          <TextArea rows={8} />
        </Form.Item>



        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export class SkillForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "edu_info"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Skill Type"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input skill name"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Skill Sets"
          name="contents"
          rules={[
            {
              required: true,
              message: "Please input location"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export class ProjectForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    const { TextArea } = Input
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "project_data"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Project name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input project name"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Project Description"
          name="content"
          rules={[
            {
              required: true,
              message: "Please input project description"
            }
          ]}
        >
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export class ExtraForm extends React.Component {
  onFinish = this.props.get_submision_data;
  onFinishFailed = this.props.get_submision_data;
  render() {
    const { TextArea } = Input
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          type: "extra_data"
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input project name"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="contents"
          rules={[
            {
              required: true,
              message: "Please input description of this activity"
            }
          ]}
        >
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}