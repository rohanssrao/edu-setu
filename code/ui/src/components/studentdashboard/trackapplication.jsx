import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobs from './jobs.json'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavBar from "../navbar";
import Badge from 'react-bootstrap/Badge';
import users from './user.json';
import applications from './applications.json'

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.currentJob.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><small><i>Posted on: {props.currentJob.created_at}</i></small></p>
        <p><b>Description</b></p>
        <p>
          {props.currentJob.description}
        </p>
        <p><b>Pre-requisites</b></p>
        <p>
          {props.currentJob.prerequisites}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export class TrackApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      user_id: 1,
      currentJob: {},
      applications: []

    }
  }
  componentWillMount() {
    for (var i = 0; i < users.length; i++) {
      if (users[i].user_id == this.state.user_id) {
        this.setState({ current_user: users[i] }, () => {
          console.log(this.state.current_user);
          for (var j = 0; j < applications.length; j++) {
            console.log(applications)
            if (this.state.current_user.user_id == applications[j].student_user_id) {
              this.setState({ applications: [...this.state.applications, applications[j]] }, () => console.log(this.state.applications))
            }
          }
        });
      }
    }

  }
  render() {
    return (
      <>
        <NavBar />
        <h1 className="display-6">Hi, {this.state.current_user.display_name}</h1>
        <p>Track your applications</p>

        <link rel="stylesheet" href="studentDashboard.css"></link>

        <div className="container">
          <Table striped hover className="col-6" responsive>
            <thead>
              <tr>
                <th>Job ID</th>
                <th >Role</th>
                <th>Professor</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {

                this.state.applications.map(application => (
                  <tr>
                    <td>{application.application_id}</td>
                    <td><a className="link-primary" onClick={() => {
                      this.setState({ modalShow: true });
                      this.setState({ currentJob: application })
                      //setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                    }}>
                      {application.title}
                    </a>

                      <MyVerticallyCenteredModal
                        show={this.state.modalShow} currentJob={this.state.currentJob}
                        onHide={() => this.setState({ modalShow: false })}
                      /></td>
                    <td>{application.professor_display_name}</td>
                    <td>{application.professor_department}</td>
                    <td>{application.location}</td>

                    <td>
                      {
                        (application.status == "Pending" && <Badge bg="info">Pending</Badge>) ||
                        (application.status == "Hired" && <Badge bg="success">Hired</Badge>) ||
                        (application.status == "Rejected" && <Badge bg="secondary">Rejected</Badge>)
                       
                      }
                    </td>
                  </tr>

                ))
              }
            </tbody>
          </Table>
        </div>
      </>
    )
  }
}

export default TrackApplication