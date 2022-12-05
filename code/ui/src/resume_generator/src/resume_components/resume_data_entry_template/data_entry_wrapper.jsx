import { delete_data_entry } from "../../utils";
import React from "react";
// This function takes a component...
export function create_resume_data_entry(Component, data, type, add_to_resume) {

  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.delete_entry = this.delete_entry.bind(this);
      this.state = {
        data: data,
        user_id: data.external_id,
        data_id: data.id,
        type: type,
        show: true
      };
    }
    delete_entry() {
      delete_data_entry(this.state.user_id, this.state.data_id, this.state.type)
      this.setState({ show: false })
    }

    render() {
    
      if (this.state.show) {
        return (<Component key={data.id} data={this.state.data} deletion={this.delete_entry} add_to_resume={add_to_resume} />);
      }
      else {
        return null
      }
    }
  };
}