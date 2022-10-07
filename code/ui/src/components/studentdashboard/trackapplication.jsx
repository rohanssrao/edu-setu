import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavBar from "./navbar";
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
        <p><small><i>Applied on: {props.currentJob.created_at}</i></small></p>
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
      user_id: 0,
      currentJob: {},
      applications: [],
      current_user: {}

    }
  }
  async componentWillMount() {
    await this.setState({ user_id: sessionStorage.getItem("user_id") });
    console.log(this.state.user_id);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "user_id": this.state.user_id })
    };
    await fetch('http://140.238.250.0:5000/get_user_profile', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.data }));

    const requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "student": this.state.user_id })
    };
    await fetch('http://140.238.250.0:5000/get_all_applications_by_student', requestOptions2)
      .then(response => response.json())
      .then(data => this.setState({ applications: data.data }, () => {
        if (this.state.applications.length == 0) {
          var message = "You haven't submitted any applications yet."
          this.removeTable(message);
        }
      }
      ));


  }
  removeTable(message) {

    var table = document.getElementById("applications");
    console.log(table)
    table.style.display = "none";
    const para = document.createElement("p");
    const node = document.createTextNode(message);
    para.appendChild(node);
    const element = document.getElementById("mainBody");
    element.appendChild(para);

  }

  withdrawApplication(application) {
    const requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "application_id": application.application_id, "status": "Withdrawn", "remarks":application.remarks })
    };
    fetch('http://140.238.250.0:5000/update_application', requestOptions2)
      .then(response => response.json())
      .then(data => {
        if (data.data == "Application updated.") {
          alert("Application Withdrawn.");
        }
      });
    window.location.reload();

  }

  render() {
    return (
      <>
        <NavBar />
        <h1 className="display-6">Hi, {this.state.current_user.display_name}</h1>
        <p>Track your applications</p>

        <link rel="stylesheet" href="studentDashboard.css"></link>

        <div id="mainBody">

          <div className="container" id="applications">
            {
              (this.state.applications.length > 0) && <Container>
                <Row>
                  <Col xs={2}><b>Application Id</b></Col>
                  <Col xs={2}><b>Applied On</b></Col>
                  <Col xs={4}><b>Title</b></Col>
                  <Col xs={2}><b>Professor</b></Col>
                  <Col xs={2}><b>Status</b></Col>

                </Row>
                {
                  this.state.applications.map(application => (
                    <Row>
                      <Accordion flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <Col xs={2}>{application.application_id}</Col>

                            <Col xs={2}>
                              {application.created_at}
                            </Col>
                            <Col xs={4}>
                              <a className="link-primary" onClick={() => {
                                this.setState({ modalShow: true });
                                this.setState({ currentJob: application })
                                //setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                              }}>
                                {application.title}
                              </a>
                              <MyVerticallyCenteredModal
                                show={this.state.modalShow} currentJob={this.state.currentJob}
                                onHide={() => this.setState({ modalShow: false })}
                              /></Col>
                            <Col xs={2}>
                              {application.professor_display_name}
                            </Col>
                            <Col xs={2}>
                              {
                                (application.status.toLowerCase() == "pending" && <Badge bg="warning">Pending</Badge>) ||
                                (application.status.toLowerCase() == "hired" && <Badge bg="success">Hired</Badge>) ||
                                (application.status.toLowerCase() == "rejected" && <Badge bg="danger">Rejected</Badge>) ||
                                (application.status.toLowerCase() == "withdrawn" && <Badge bg="dark">Withdrawn</Badge>) ||
                                (application.status.toLowerCase() == "in_progress" && <Badge bg="info">In Progress</Badge>)
                              }
                            </Col>

                          </Accordion.Header>
                          <Accordion.Body>
                            <b>Description</b><br />
                            {application.description} <br />
                            <b>Status: </b>
                            {
                              (application.status.toLowerCase() == "pending" && <Badge bg="warning">Pending</Badge>) ||
                              (application.status.toLowerCase() == "hired" && <Badge bg="success">Hired</Badge>) ||
                              (application.status.toLowerCase() == "rejected" && <Badge bg="danger">Rejected</Badge>) ||
                              (application.status.toLowerCase() == "withdrawn" && <Badge bg="dark">Withdrawn</Badge>) ||
                              (application.status.toLowerCase() == "in_progress" && <Badge bg="info">In Progress</Badge>)

                            } <br />
                            {
                              (application.remarks && <p><b>Remarks:</b> {application.remarks}</p>)
                            }
                            Last updated: <i>{application.updated_at}</i><br />
                            {
                              application.status.toLowerCase() != "withdrawn" && <Button onClick={(e) => this.withdrawApplication(application, e)} variant="danger" size="sm">Withdraw</Button>
                            }

                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Row>
                  ))
                }
              </Container>
            }
          </div>
        </div>
      </>
    )
  }
}

export default TrackApplication