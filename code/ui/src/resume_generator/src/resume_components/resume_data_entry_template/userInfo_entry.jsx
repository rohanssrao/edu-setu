import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { extract_value_by_keys } from "../../utils";
export default class UserInfo extends React.Component {
  
  render = () => {
    const entry_value = extract_value_by_keys(this.props.data, ['name', 'email', 'website', 'phone', 'id', 'external_id'])
    
      return (
        <React.Fragment>
          <div className="site-card-border-less-wrapper">
            <Card>
              <p><b>{entry_value.name}</b><DeleteOutlined
                onClick={() => {this.props.deletion()}} /> </p>
              <div onClick={() => { this.props.add_to_resume(['user_data', entry_value]) }}>
              <p>  {entry_value.email}</p>
              <p>  {entry_value.website}</p>
              <p>  {entry_value.phone}</p>
              </div>

            </Card>
          </div>
        </React.Fragment>
      )
  }
 
}
