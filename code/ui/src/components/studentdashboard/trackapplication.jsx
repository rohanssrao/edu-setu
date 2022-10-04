import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobs from './jobs.json'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import NavBar from "../navbar";
import users from './user.json'

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
      currentJob: {}

    }
  }
  componentWillMount() {
    for (var i = 0; i < users.length; i++) {
      if (users[i].user_id == this.state.user_id) {
        this.setState({ current_user: users[i] }, () => {
          console.log(this.state.current_user);
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
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                jobs.map(jobs => (
                  <tr>
                    <td>{jobs.posting_id}</td>
                    <td><a className="link-primary" onClick={() => {
                      this.setState({ modalShow: true });
                      this.setState({ currentJob: jobs })
                      //setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                    }}>
                      {jobs.title}
                    </a>

                      <MyVerticallyCenteredModal
                        show={this.state.modalShow} currentJob={this.state.currentJob}
                        onHide={() => this.setState({ modalShow: false })}
                      /></td>
                    <td>{jobs.professor}</td>
                    <td>{jobs.department}</td>
                    <td>{jobs.location}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item href="#/action-1" active onClick={(e) => this.apply(jobs, e)}>Apply</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Save for Later</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Get shareable URL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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