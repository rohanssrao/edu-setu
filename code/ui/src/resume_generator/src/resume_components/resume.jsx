import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toTitleCase, getItems, reorder } from "../utils.js";
import { UserInfo } from "./template_component/user_template"
import { create_resume_template } from "./template_component/template_wrapper.jsx";
import { Education } from "./template_component/edu_template"
import { Skill } from "./template_component/skill_template"
import { WorkExp } from "./template_component/workExp_template"
import { Project } from "./template_component/project_template"
import { Extra } from "./template_component/extra_template"
//get style for vertical drag and drop
const getVItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: 2,
  // margin: `0 0 2px 0`,

  // change background colour if dragging
  background: isDragging ? "grey" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getVListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: 2,
  // width: 250
});
export default class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_components: [],
      education_components: [],
      skill_components: [],
      workExp_components: [],
      project_components: [],
      extra_components: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result, item, item_name) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(item, result.source.index, result.destination.index);
    this.setState({ [item_name]: items })
    // if (item_name === "education_components") {
    //   this.setState({ education_components: items });
    // } else if (item_name === "skill_components") {
    //   this.setState({ skill_components: items });
    // } else if (item_name === "workExp_components") {
    //   this.setState({ workExp_components: items });
    // } else if (item_name === "project_components") {
    //   this.setState({ project_component: items });
    // } else if (item_name === "extra_components") {
    //   this.setState({ extra_component: items });
    // }
    // else if (item_name === "user_components") {
    //   this.setState({ user_components: items })
    // }
    // else {
    //   this.setState({ items2: items });
    // }
  }
  create_drag_and_drop(items, item_name) {
    return (
      <DragDropContext
        onDragEnd={result => {
          this.onDragEnd(result, items, item_name);
        }}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getVListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getVItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
  //Not comparing prevous state for now
  componentDidUpdate(preState, prevProps) {
    const data_type = {
      'user_components': 'user_data',
      "education_components": "edu_data",
      "skill_components": "skill_data",
      "workExp_components": "workExp_data",
      "project_components": "project_data",
      "extra_components": "extra_data"
    }

    const type_to_component = {
      'user_data': UserInfo,
      'edu_data': Education,
      'skill_data': Skill,
      'workExp_data': WorkExp,
      'project_data': Project,
      'extra_data': Extra
    }

    for (const [key, value] of Object.entries(data_type)) {

      const components = this.state[key]
      const incomming_data = this.props[value]
      const delete_from_resume = this.props.delete_from_resume

      if (components.length != incomming_data.length) {
        let components_list = []
        for (const e of incomming_data) {
          const Component = create_resume_template(type_to_component[value], e, value, delete_from_resume)
          components_list.push(<Component key={e.id} />)
        }
        this.setState({ [key]: getItems(components_list) })
      }
    }



  }
  render() {

    return (
      <div id="resume_tamplate">
        {this.create_drag_and_drop(
          this.state.user_components,
          "user_components"
        )}
        <h2 id="education">Education</h2>
        {this.create_drag_and_drop(
          this.state.education_components,
          "education_components"
        )}
        <h2>Skills</h2>
        {this.create_drag_and_drop(
          this.state.skill_components,
          "skill_components"
        )}

        <h2 id="relevant-experience">Work Experience</h2>
        {this.create_drag_and_drop(
          this.state.workExp_components,
          "workExp_components"
        )}
        <h2>Projects</h2>
        {this.create_drag_and_drop(
          this.state.project_components,
          "project_components"
        )}
        <h2 id="other-experience">Extracurriculum</h2>
        {this.create_drag_and_drop(
          this.state.extra_components,
          "extra_components"
        )}
      </div>
    );
  }
}
