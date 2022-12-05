import { DeleteOutlined } from '@ant-design/icons';
import React from "react";
// This function takes a component...
const HOVERCOLOR = "#91caff";
export function create_resume_template(Component, data, type, delete_from_resume) {

    // ...and returns another component...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hover: false,
                data: data,
                user_id: data.external_id,
                data_id: data.id,
                type: type,
                show: true
            };
        }
        set_hover = (flag) => {
            if (this.state.hover !== flag) {
                this.setState({ hover: flag });
            }
        };

        render() {
            const div_style = this.state.hover
                ? { backgroundColor: HOVERCOLOR, cursor: "pointer" }
                : {};
            return (
                <div style={div_style}
                    onMouseEnter={() => { this.set_hover(true) }}
                    onMouseLeave={() => { this.set_hover(false) }} >
                    <div style={{}}>
                        <div>
                            <Component data={data} />
                        </div>



                        {this.state.hover ? <DeleteOutlined onClick={() => { delete_from_resume(type, data) }} /> : null}


                    </div>


                </div>


            )
        }
    };
}