import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
export default class Project extends React.Component {
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card>
          <p><b> {this.props.data.name} </b> <DeleteOutlined onClick={() => {
            this.props.deletion();
          }} /></p>
          <div onClick={() => { this.props.add_to_resume(['project_data', this.props.data]) }}>
            <p>{this.props.data.content}</p>
          </div>
        </Card>
      </div>
    );
  }
}