import React from "react";
import { Card } from "antd";
import { render_contents } from "../../utils"
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
export default class Extra extends React.Component {

  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card>
          <p><b onClick={() => {
            this.props.add_to_resume(["extra_data", this.props.data]);
          }} > {this.props.data.name}</b> <DeleteOutlined
              onClick={() => {
                this.props.deletion();
              }}
            />

          </p>

          <ul>
            {render_contents(this.props.data.contents)}
          </ul>

        </Card>
      </div>
    );
  }
}
