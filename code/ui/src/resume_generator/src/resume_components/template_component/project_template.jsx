import React from "react";
export class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    render() {
        return (
            <div>
                <h3>{this.props.data.name}</h3>
                <p>{this.props.data.content}</p>
            </div>
        );
    }
}
Project.defaultProps = {
    name: "Article Website",
    content:
        "Designed and implemented an article hosting website using spring boot. I utilized the power of jQuery and Boostrap4 to make an engaging and interactive user experience and also to achieve a responsive website design creating a good reading experience for users and ease of management for admin.",
    tag: ["Django", "python", "website", "Backend", "MySQL"]
};