import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobs from './data.json'
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function StudentDashboard() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <h1 class="display-3">Search for a research role</h1>
    <p>Enhance your skills by working as a research assistant under professors</p>
      <div class="container">
        <div class="row justify-content-center align-items-center">
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
              <Dropdown.Item href="#/action-1" active>CS</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Mechanical</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="col-sm">
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Type
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1" active>Remote</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Hybrid</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Office</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <link rel="stylesheet" href="studentDashboard.css"></link>

      <div class="container">
        <Table striped hover className="col-6">
          <thead>
            <tr>
              <th>Job ID</th>
              <th >Role</th>
              <th>Professor</th>
              <th>Department</th>
              <th>Description</th>
              <th>Type</th>
              <th>Pay Range</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.map(data => (
                <tr>
                  <td>{data.id}</td>
                  <td><a class="link-primary" onClick={() => setModalShow(true)}>
                    {data.role}
                  </a>

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    /></td>
                  <td>{data.professor}</td>
                  <td>{data.department}</td>
                  <td>{data.description}</td>
                  <td>{data.type}</td>
                  <td>{data.pay_range}</td>
                  <td>{data.department}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Actions
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1" active>Apply</Dropdown.Item>
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