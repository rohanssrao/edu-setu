import React from "react";
import contact_icon from "../../static/contact_icon.svg";
import github_icon from "../../static/github_icon.svg";
import { DeleteOutlined } from '@ant-design/icons';
export class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  render() {

    const mailto = "mailto:" + this.props.data.email;
    return (
      <React.Fragment>
        <p>
          <span className="name"> {this.props.data.name}  </span>
        </p>
        <span className="info">
          <p>
            <a href={mailto}>
              <img src={contact_icon} alt="Mail" /> {this.props.data.email}
            </a>
            <a href={this.props.data.website}>
              <img src={github_icon} alt="GitHub" /> {this.props.data.website}
            </a>
            {this.props.display_phone_number ? this.props.data.phone : null}
          </p>
        </span>
      </React.Fragment>

    );
  }
}
UserInfo.defaultProps = {
  data: {
    username: "Your Name",
    email: "email@gmail.com",
    phone: "xxx-xxx-xxxx",
    gpa: "gpa",
    website: "website.com",
    display_phone_number: true
  },
  display_phone_number: true
};