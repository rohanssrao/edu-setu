import React from "react";
const HOVERCOLOR = "#91caff";
export class Education extends React.Component {
    render() {

        return (
            <React.Fragment>
                <h3>
                    {this.props.data.name} {" | "}<location className="location">{this.props.data.location} </location>
                    <time> {this.props.data.date} </time>
                </h3>
                <ul>
                    <li>{this.props.data.program}</li>
                    <li>{this.props.data.gpa}</li>
                </ul>
            </React.Fragment>
        );
    }
}
Education.defaultProps = {
    name: "North carolina state university",
    location: "Raleigh, NC",
    date: "Aug. 2015 - Dec. 2019",
    program: "Bachelor of Computer Science"
};