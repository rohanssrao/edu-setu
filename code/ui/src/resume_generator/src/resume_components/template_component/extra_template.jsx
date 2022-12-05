import React from "react";
import { render_contents } from "../../utils";
export class Extra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    render() {

        return (
            <React.Fragment>


                <h3>
                    {this.props.data.name} <time> {this.props.data.time} </time>
                </h3>
                <ul>
                    {render_contents(this.props.data.contents)}
                </ul>

            </React.Fragment>
        );
    }
}
Extra.defaultProps = {
    date: "Apr 2022 – Present",
    name: "Certification of Deep Learning Specialization from Coursera.",
    contents: []
};
