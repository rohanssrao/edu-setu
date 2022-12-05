import React from "react";
import { toTitleCase, getItems, reorder } from "../../utils.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getHItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: 2,
  // margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "grey" : null,

  // styles we need to apply on draggables
  ...draggableStyle
});
const getHListStyle = isDraggingOver => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: "flex"
  // justifyContent: 'center',
  // overflow: 'auto',
});

export class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <p>
          {" "}
          <b> &#x2022; {toTitleCase(this.props.data.name)}:</b>
          {this.props.data.contents.join(", ")}
        </p>
      </div>
    );
  }
}
Skill.defaultProps = {
  name: "operating system",
  contents: ["Linux, ", "Windows, ", "Mac OS, "]
};
