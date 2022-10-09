import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Layout, Menu, Button, Popconfirm, message } from "antd";
import { GlobalOutlined, ProfileOutlined, UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Postings from "../ProfessorDashboard/Postings";
import Applications from "../ProfessorDashboard/Applications";
import Profile from "../ProfessorDashboard/Profile";

const { Header, Content } = Layout;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected_tab: "",
		};
	}
	onTabChange = (e) => {
		this.setState({
			selected_tab: e.key,
		});
	};
	onLogOut = () => {
		sessionStorage.clear();
		message.success("User Logged out successfully.", 1);
		window.location.replace("/");
	};
	render() {
		let renderTab = <Postings />;
		switch (this.state.selected_tab) {
			case "postings":
				renderTab = <Postings />;
				break;
			case "applications":
				renderTab = <Applications />;
				break;
			case "profile":
				renderTab = <Profile />;
		}
		return (
			<Layout style={{ maxHeight: "1000px" }}>
				<Header
					style={{
						position: "fixed",
						zIndex: 1,
						width: "100%",
						backgroundColor: "#f7f7f7",
						float: "left",
					}}>
					<div className="logo">
						<img src={logo} style={{ width: "100px", height: "50px" }} alt="logo"></img>
					</div>

					<Menu theme="light" mode="horizontal" style={{ backgroundColor: "#f7f7f7" }} defaultSelectedKeys={["postings"]} onClick={this.onTabChange}>
						<Menu.Item key="postings" style={{ float: "left" }} icon={<ProfileOutlined />}>
							Postings
						</Menu.Item>
						<Menu.Item style={{ float: "left" }} key="applications" icon={<GlobalOutlined />}>
							Applications
						</Menu.Item>
						<Menu.Item key="profile" style={{ float: "right" }} icon={<UserOutlined />}>
							Profile
						</Menu.Item>
						<Menu.Item>
							<Popconfirm title="Are you sure?" onConfirm={this.onLogOut} okText="Yes" cancelText="No" icon={<QuestionCircleOutlined />}>
								<Button style={{ float: "right", marginTop: "15px" }} type="primary">
									Logout
								</Button>
							</Popconfirm>
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ margin: "0 16px", marginTop: "120px" }}>{renderTab}</Content>
			</Layout>
		);
	}
}
