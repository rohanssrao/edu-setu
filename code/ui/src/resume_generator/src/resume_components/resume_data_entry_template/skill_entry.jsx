import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { extract_value_by_keys } from "../../utils";
export default class Skill extends React.Component {


  render() {

    return (
      <div className="site-card-border-less-wrapper">
        <Card>
          <p><b>{this.props.data.name} </b><DeleteOutlined
            onClick={() => { this.props.deletion()}} /></p>
          <div onClick={() => { this.props.add_to_resume(['skill_data', this.props.data]) }}>
            <p>{this.props.data.contents.join(", ")}</p>
          </div>
        </Card>
      </div>
    );


  }
}