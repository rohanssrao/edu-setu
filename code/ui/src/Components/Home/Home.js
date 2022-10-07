import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Layout, Menu } from "antd";
import {
  GlobalOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Postings from "../ProfessorDashboard/Postings";
import Applications from "../ProfessorDashboard/Applications";

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
  render() {
    let renderTab = <Postings />;
    switch (this.state.selected_tab) {
      case "postings":
        renderTab = <Postings />;
        break;
      case "applications":
        renderTab = <Applications />;
        break;
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
          }}
        >
          <div className="logo">
            <img
              src={logo}
              style={{ width: "100px", height: "50px" }}
              alt="logo"
            ></img>
          </div>

          <Menu
            theme="light"
            mode="horizontal"
            style={{ backgroundColor: "#f7f7f7" }}
            defaultSelectedKeys={["postings"]}
            onClick={this.onTabChange}
          >
            <Menu.Item
              key="postings"
              style={{ float: "left" }}
              icon={<ProfileOutlined />}
            >
              Postings
            </Menu.Item>
            <Menu.Item
              style={{ float: "left" }}
              key="applications"
              icon={<UserOutlined />}
            >
              Applications
            </Menu.Item>
            <Menu.Item
              key="profile"
              style={{ float: "left" }}
              icon={<GlobalOutlined />}
            >
              Profile
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: "0 16px", marginTop: "120px" }}>
          {renderTab}
        </Content>
      </Layout>
    );
  }
}
