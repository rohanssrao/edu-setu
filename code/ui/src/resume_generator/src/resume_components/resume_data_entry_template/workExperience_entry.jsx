import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { render_contents } from "../../utils";

export default class WorkExperience extends React.Component {
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card>
          <p>
            <b> {this.props.data.name} </b>
            <DeleteOutlined
              onClick={() => {
                this.props.deletion();
              }}
            />
          </p>
          <div
            onClick={() => {
              this.props.add_to_resume(["workExp_data", this.props.data]);
            }}
          >
            <time> {this.props.data.date} </time>
            <p>{this.props.data.loc} </p>
            <ul>{render_contents(this.props.data.contents)}</ul>
          </div>
        </Card>
      </div>
    );
  }
}
