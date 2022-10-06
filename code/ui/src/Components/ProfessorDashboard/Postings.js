import Layout, { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import { Typography, Divider, Table, message, Modal, Button, Spin } from "antd";
import config from "../../config";
import Column from "antd/lib/table/Column";
import { BarChartOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default class Postings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      loading: false,
      visible: false,
    };
  }
  onClose = () => {
    this.setState({ visible: false });
  };
  onAddPosting = () => {
    this.setState({ visible: true });
  };
  fetchPostings = () => {
    this.setState({ loading: true });
    let url = `${config.baseUrl}/get_all_postings_by_professor`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        professor: sessionStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          this.setState({ data: response.data, filteredData: response.data });
        } else {
          message.error(response.data, 1);
        }
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchPostings();
  }
  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <Title style={{ float: "left", marginTop: "15px" }} level={4}>
            Postings
          </Title>
          <Button
            style={{ float: "right", marginTop: "15px" }}
            icon={<BarChartOutlined />}
            type="primary"
            onClick={this.onAddPosting}
          >
            Add posting
          </Button>
        </Header>
        <Divider></Divider>
        <Content>
          <Modal
            title="Add Posting"
            visible={this.state.visible}
            onCancel={this.onClose}
            footer={null}
            maskClosable={false}
            centered={true}
          >
            Add posting
          </Modal>
          <Table
            loading={this.state.loading}
            size="small"
            dataSource={this.state.filteredData}
          >
            <Column title="Title" dataIndex="title" key="title" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column
              title="Prerequisites"
              dataIndex="prerequisites"
              key="prerequisites"
            />
            <Column title="Created" dataIndex="created_at" key="created_at" />
            <Column title="Updated" dataIndex="updated_at" key="updated_at" />
          </Table>
        </Content>
      </Layout>
    );
  }
}
