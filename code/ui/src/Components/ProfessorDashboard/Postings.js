import Layout, { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import {
  Typography,
  Divider,
  Table,
  message,
  Modal,
  Button,
  Space,
  Tooltip,
  Input,
} from "antd";
import config from "../../config";
import Column from "antd/lib/table/Column";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewPosting from "./AddNewPosting";
import { UpdatePosting } from "./UpdatePosting";
const { Title } = Typography;
const { Search } = Input;
export default class Postings extends React.Component {
  formRef = React.createRef();
  updateFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      loading: false,
      loadingAddPosting: false,
      visible: false,
      updateVisible: false,
      updateData: {},
    };
  }
  onSearch = (value) => {
    const { data } = this.state;
    let searchLower = value.toLowerCase();
    let filtered = data.filter((item) => {
      if (item.title.toLowerCase().includes(searchLower)) {
        return true;
      }
    });
    this.setState({ filteredData: filtered });
  };
  onSearchChange = (e) => {
    if (e.target.value.length === 0) {
      this.onSearch("");
    }
  };
  onClose = () => {
    this.setState({ visible: false, updateVisible: false });
  };
  onAddPosting = () => {
    this.setState({ visible: true });
  };
  populateUpdateData = () => {
    this.updateFormRef.current?.setFieldsValue(this.state.updateData);
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
    // this.setState({ visible: true });
  }
  submitAddPosting = (data) => {
    this.setState({ loadingAddPosting: true });
    let url = `${config.baseUrl}/add_posting`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          this.setState({ visible: false });
          message.success(response.data);
          this.fetchPostings();
        } else {
          message.error(response.data, 3);
          this.registerFormRef.current?.resetFields();
        }
        this.setState({ loadingAddPosting: false });
      })
      .catch((err) => console.log(err));
  };
  submitUpdatePosting = (data) => {
    this.setState({ loadingAddPosting: true });
    let url = `${config.baseUrl}/update_posting`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          this.setState({ updateVisible: false });
          message.success(response.data);
          this.fetchPostings();
        } else {
          message.error(response.data, 3);
          this.registerFormRef.current?.resetFields();
        }
        this.setState({ loadingAddPosting: false });
      })
      .catch((err) => console.log(err));
  };
  onUpdate = (record) => {
    this.setState({ updateVisible: true, updateData: record });
  };
  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <Title style={{ float: "left", marginTop: "15px" }} level={4}>
            Postings
          </Title>
          <Search
            onChange={this.onSearchChange}
            placeholder="Search..."
            allowClear
            style={{ width: "60%", marginTop: "15px", marginLeft: "8%" }}
            onSearch={this.onSearch}
            name="postingSearch"
          />
          <Button
            style={{ float: "right", marginTop: "15px" }}
            icon={<PlusOutlined />}
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
            <AddNewPosting {...this} {...this.state} {...this.props} />
          </Modal>
          <Modal
            title="Update Posting"
            visible={this.state.updateVisible}
            onCancel={this.onClose}
            footer={null}
            maskClosable={false}
            centered={true}
          >
            <UpdatePosting {...this} {...this.state} {...this.props} />
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
            <Column
              title="Actions"
              key="action"
              render={(record) => (
                <Space size="small">
                  <Tooltip title="Update Posting">
                    <Button
                      disabled={this.state.readOnly}
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => this.onUpdate(record)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Posting">
                    <Button disabled type="link" icon={<DeleteOutlined />} />
                  </Tooltip>
                </Space>
              )}
            ></Column>
          </Table>
        </Content>
      </Layout>
    );
  }
}
