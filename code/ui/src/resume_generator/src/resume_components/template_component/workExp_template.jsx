import React from "react";
import { render_contents } from "../../utils";

export class WorkExp extends React.Component {
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
                    {this.props.data.name} <time> {this.props.data.date} </time>
                </h3>
                <p className="location">{this.props.data.location} </p>
                <ul>
                    {render_contents(this.props.data.contents)}
                </ul>
            </React.Fragment>
        );
    }
}
WorkExp.defaultProps = {
    title: "Research Assistant",
    location: "North Carolina State University Under Dr. Ismail Guvenc’s lab",
    date: "Sep. 2017 - Jan. 2019",
    contents: [
        "Designed and performed experiments related to Ultra-wideband radars and drone localization.",
        "Processed and presented experimental data using the R language and Matlab.",
        "Created a model using machine learning to locate the drone"
    ],
    tags: []
};