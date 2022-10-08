import { Form, Input, Button, Typography, message, Popconfirm, Spin, Divider } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import config from "../../config";
import Layout, { Content, Header } from "antd/lib/layout/layout";

const { Title } = Typography;

const formItemLayout = {
	labelCol: {
		xs: {
			span: 8,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 8,
		},
		sm: {
			span: 8,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

export default class Profile extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			user_id: sessionStorage.getItem("user_id"),
			valuesChanged: false,
			waitingForFetch: false,
			loading: false,
		};
		this.onLogOut = this.onLogOut.bind(this);
	}
	onLogOut = () => {
		sessionStorage.clear();
		message.success("User Logged out successfully.", 1);
		window.location.replace("/");
	};
	fetchUserDetails = () => {
		this.setState({ waitingForFetch: true, loading: true });
		let url = `${config.baseUrl}/get_user_profile`;
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			body: JSON.stringify({ user_id: sessionStorage.getItem("user_id") }),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.formRef.current.setFieldsValue({
						display_name: response.data.display_name,
						user_id: response.data.user_id,
						type: response.data.type,
						phone: response.data.phone,
						email: response.data.email,
						designation: response.data.designation,
						department: response.data.department,
					});
					this.setState({ valuesChanged: false });
				} else {
					message.error(response.message, 1);
				}
			});
		this.setState({ waitingForFetch: false, loading: false });
	};
	componentDidMount() {
		this.fetchUserDetails();
	}
	onFinish = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/edit_profile`;
		this.formRef.current.validateFields().then((values) => {
			fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
				body: JSON.stringify(values),
			})
				.then((res) => res.json())
				.then((response) => {
					if (response.status) {
						message.success(response.data, 1);
						this.fetchUserDetails();
						this.setState({ loading: false });
					} else {
						message.error(response.data, 1);
					}
				})
				.catch((err) => console.log(err));
		});
	};

	render() {
		return (
			<Layout>
				<Header style={{ backgroundColor: "white" }}>
					<Title style={{ float: "left", marginTop: "15px" }} level={4}>
						Profile
					</Title>
				</Header>
				<Divider></Divider>
				<Content>
					<Form {...formItemLayout} name="userAccount" ref={this.formRef} onFinish={(e) => this.onFinish(e)}>
						<Form.Item
							name="display_name"
							label="Display Name"
							rules={[
								{
									required: true,
									message: "Please input the Full Name. This will be used for Display Purpose",
								},
							]}>
							<Input
								onChange={() => {
									this.setState({ valuesChanged: true });
								}}
								placeholder="Full Name"></Input>
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									required: true,
									type: "email",
									message: "Please input valid Email. This will be used in case the user forgets password.",
								},
							]}>
							<Input
								onChange={() => {
									this.setState({ valuesChanged: true });
								}}
								placeholder="Email ID"></Input>
						</Form.Item>
						<Form.Item
							name="user_id"
							label="User ID"
							rules={[
								{
									required: true,
									message: "Please input username. This will be used for Login.",
								},
							]}>
							<Input placeholder="Username" disabled />
						</Form.Item>
						<Form.Item
							name="type"
							label="You are a"
							rules={[
								{
									required: true,
									message: "Please input username. This will be used for Login.",
								},
							]}>
							<Input placeholder="Type" disabled />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Phone"
							rules={[
								{
									required: false,
								},
								{
									pattern: new RegExp("^[0-9]{10}$"),
									message: "Please enter a valid phone number.",
								},
							]}>
							<Input
								onChange={() => {
									this.setState({ valuesChanged: true });
								}}
								placeholder="Phone"
							/>
						</Form.Item>
						<Form.Item name="department" label="Department">
							<Input
								onChange={() => {
									this.setState({ valuesChanged: true });
								}}
								placeholder="Department"
							/>
						</Form.Item>{" "}
						<Form.Item name="designation" label="Designation">
							<Input
								onChange={() => {
									this.setState({ valuesChanged: true });
								}}
								placeholder="Designation"
							/>
						</Form.Item>
						<Form.Item {...tailFormItemLayout}>
							<Popconfirm
								placement="bottom"
								title="Are you sure?"
								onConfirm={this.onFinish}
								okText="Yes"
								cancelText="No"
								icon={<QuestionCircleOutlined />}>
								<Button loading={this.state.loading} type="primary" disabled={!this.state.valuesChanged}>
									Update Profile
								</Button>
							</Popconfirm>
							<Popconfirm
								placement="bottom"
								title="Are you sure?"
								onConfirm={this.fetchUserDetails}
								okText="Yes"
								cancelText="No"
								icon={<QuestionCircleOutlined />}>
								<Button style={{ marginLeft: "3px" }} type="default" loading={this.state.waitingForFetch || this.state.loading}>
									Undo Changes
								</Button>
							</Popconfirm>
						</Form.Item>
					</Form>
				</Content>
			</Layout>
		);
	}
}
