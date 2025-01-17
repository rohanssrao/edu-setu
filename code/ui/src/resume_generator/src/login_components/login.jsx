import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

export class Login extends React.Component {
  onFinish = (values) => { this.props.onFinish(values) }
  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  render = () => {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 18
        }}

        initialValues={{
          remember: true
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Checkbox>Remember me</Checkbox>
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
  };
}
