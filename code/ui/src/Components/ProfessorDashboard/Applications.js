import Layout, { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import { Typography, Divider, Table, message, Modal, Button, Spin } from "antd";
import config from "../../config";
import Column from "antd/lib/table/Column";
import { BarChartOutlined } from "@ant-design/icons";
const { Title } = Typography;


export default class Applications extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			filteredData: [],
			loading: false
		};
	}
	onClose = () => {
		this.setState({ displayGraph: false });
	};
	fetchPostings = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_all_postings`;
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
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
	render(){
		
		return (
			<Layout>
				<Header style={{ backgroundColor: "white" }}>
					<Title style={{ float: "left", marginTop: "15px" }} level={4}>
                        Applications
					</Title>
					<Button style={{ float: "right", marginTop: "15px" }} icon={<BarChartOutlined />} type="primary" onClick={this.onDisplayGraph}>
						Add posting
					</Button>
				</Header>
				<Divider></Divider>
				<Content>
					{/* <Modal
						width={1000}
						title="Bar Chart"
						visible={this.state.displayGraph}
						onCancel={this.onClose}
						footer={null}
						maskClosable={false}
						centered={true}>
						{this.state.loading ? <Spin></Spin> : <BarChart {...barchart_config}></BarChart>}
					</Modal> */}
					<Table loading={this.state.loading} size="small" dataSource={this.state.filteredData}>
						<Column title="Premise ID" dataIndex="prem_id" key="prem_id" />
						<Column title="Name" dataIndex="name" key="name" />
						<Column title="Address" dataIndex="address" key="address" />
						<Column title="City" dataIndex="city" key="city" />
						<Column title="Postal Code" dataIndex="postal_code" key="postal_code" />
						<Column title="State" dataIndex="state" key="state" />
						<Column title="Total Animals" dataIndex="total_animals" key="total_animals" />
					</Table>
                    Applications
				</Content>
			</Layout>
		);
	}
}
