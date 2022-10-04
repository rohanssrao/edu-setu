import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobs from './jobs.json'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

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
          {props.currentJob.role}
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

function apply(jobs) {
  console.log(jobs);
}
function saveJob(jobs) {
  console.log(jobs);
}
export function StudentDashboard() {
  const [modalShow, setModalShow] = React.useState(false);
  const [currentJob, setCurrentJob] = React.useState({ "role": "", "prerequisites": "", "description": "" });
  return (
    <>
      <h1 className="display-3">Search for a research role</h1>
      <p>Enhance your skills by working as a research assistant under professors</p>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <InputGroup className="col-sm text-center">
            <FormControl
              placeholder="What are you looking for?"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <Dropdown className="col-sm text-center">
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Department
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {
                jobs.map(jobs => (
                  <Dropdown.Item href="#/action-1" >{jobs.department}</Dropdown.Item>
                )
                )
              }
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="col-sm">
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Type
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1">Remote</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Hybrid</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Office</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <link rel="stylesheet" href="studentDashboard.css"></link>

      <div className="container">
        <Table striped hover className="col-6">
          <thead>
            <tr>
              <th>Job ID</th>
              <th >Role</th>
              <th>Professor</th>
              <th>Department</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.map(jobs => (
                <tr>
                  <td>{jobs.id}</td>
                  <td><a className="link-primary" onClick={() => {
                    setModalShow(true);
                    setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                  }}>
                    {jobs.role}
                  </a>

                    <MyVerticallyCenteredModal
                      show={modalShow} currentJob={currentJob}
                      onHide={() => setModalShow(false)}
                    /></td>
                  <td>{jobs.professor}</td>
                  <td>{jobs.department}</td>
                  <td>{jobs.type}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Actions
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1" active onClick={(e) => apply(jobs, e)}>Apply</Dropdown.Item>
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

export default StudentDashboard