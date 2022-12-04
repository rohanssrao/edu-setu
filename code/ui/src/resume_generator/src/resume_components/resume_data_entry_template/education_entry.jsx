import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { extract_value_by_keys } from "../../utils";
import { Card } from "antd";

export default class Education extends React.Component {
  render() {
    const entry_value = extract_value_by_keys(this.props.data, [
      "name",
      "external_id",
      "id",
      "location",
      "program",
      "gpa",
      "date"
    ]);
    return (
      <div className="site-card-border-less-wrapper">
        <Card>
          <p>
            <b> {entry_value.name}</b>
            <DeleteOutlined
              onClick={() => {
                this.props.deletion()
              }}
            />
          </p>
          <div
            onClick={() => {
              this.props.add_to_resume(["edu_data", entry_value]);
            }}
          >
            <p> {entry_value.location}</p>
            <p> {entry_value.program}</p>
            <p> {entry_value.gpa}</p>
            <p> {entry_value.date}</p>
          </div>
        </Card>
      </div>
    );

  }
}
