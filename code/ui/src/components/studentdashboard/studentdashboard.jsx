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
        <Button onClick={props.apply}>Apply</Button>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      user_id: 1,
      currentJob: {},
      selectedDepartment: "",
      selectedLocation: ""

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
  apply(jobs) {
    console.log("Applying");
    console.log(jobs);
  }
  saveJob(jobs) {
    console.log(jobs);
  }
  filterByTitle() {
    var input = document.getElementById("searchTitle");
    console.log(input);
    var filter = input.value.toUpperCase();
    var table = document.getElementById("postings");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue, i;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  filterByDepartment(e) {
    var filter = e.target.id.toUpperCase();
    var table = document.getElementById("postings");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue, i, flag=0;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          flag = 1;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
    this.checkMatchingPostings(flag);

  }
  checkMatchingPostings(flag){
    if (flag == 0){
      var table = document.getElementById("postings");
      console.log(table);
      table.style.display = "none";
      const para = document.createElement("p");
      const node = document.createTextNode("Sorry, couldn't find any matching jobs.");
      para.appendChild(node);
      const element = document.getElementById("mainBody");
      element.appendChild(para);
    }

  }
  filterByLocation(e) {

    var filter = e.target.id.toUpperCase();
    var table = document.getElementById("postings");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue, i, flag = 0;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          flag = 1
        } else {
          tr[i].style.display = "none";
        }
      }
    }
    this.checkMatchingPostings(flag);
  }
  //const[modalShow, setModalShow] = React.useState(false);
  //const[currentJob, setCurrentJob] = React.useState({ "role": "", "prerequisites": "", "description": "" });
  render() {
    return (
      <>
        <NavBar />
        <h1 className="display-3">Search for a research role</h1>
        <p>Enhance your skills by working as a research assistant under professors</p>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <InputGroup className="col-sm text-center">
              <FormControl
                placeholder="What are you looking for?"
                aria-label="Search"
                aria-describedby="basic-addon2" id="searchTitle"
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={this.filterByTitle}>
                Search
              </Button>
            </InputGroup>
            <Dropdown className="col-sm text-center" id="searchDepartment">
              <Dropdown.Toggle variant="secondary">
                Department
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={(e) => this.filterByDepartment( e)} id="CS">CS</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByDepartment( e)} id="Mechanical">Mechanical</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="col-sm">
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                Location
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={(e) => this.filterByLocation( e)} id="Remote">Remote</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByLocation( e)} id="Hybrid">Hybrid</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByLocation( e)} id="Physical">Physical</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <link rel="stylesheet" href="studentDashboard.css"></link>

        <div className="container" id="mainBody">
          <Table striped hover className="col-6" responsive id="postings">
            <thead>
              <tr>
                <th>Job ID</th>
                <th >Title</th>
                <th>Professor</th>
                <th>Department</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                jobs.map(jobs => (
                  <tr>
                    <td>{jobs.posting_id}</td>
                    <td id="postingTitle"><a className="link-primary" onClick={() => {
                      this.setState({ modalShow: true });
                      this.setState({ currentJob: jobs })
                      //setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                    }}>
                      {jobs.title}
                    </a>

                      <MyVerticallyCenteredModal
                        show={this.state.modalShow} currentJob={this.state.currentJob}
                        apply={(e) => this.apply(this.state.currentJob, e)}
                        onHide={() => this.setState({ modalShow: false })}
                      /></td>
                    <td>{jobs.professor_display_name}</td>
                    <td id="postingDepartment">{jobs.professor_department}</td>
                    <td id="postingLocation">{jobs.location}</td>
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

export default StudentDashboard