import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import NavBar from "./navbar";

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
      user_id: 1007,
      currentJob: {},
      selectedDepartment: "",
      selectedLocation: "",
      jobs: [],
      jobs_all: [],
      applications: []

    }
  }
  async componentWillMount() {
    var jobs = []
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "user_id": this.state.user_id })
    };
    await fetch('http://140.238.250.0:5000/get_user_profile', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.data }, () => { console.log(this.state.current_user); }));
    await fetch('http://140.238.250.0:5000/get_all_postings')
      .then(response => response.json())
      .then(data => this.setState({ jobs_all: data.data }, () => { console.log(this.state.jobs_all); }));
    const requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "student": this.state.user_id })
    };
    
    await fetch('http://140.238.250.0:5000/get_all_applications_by_student', requestOptions2)
      .then(response => response.json())
      .then(data => this.setState({ applications: data.data }));
    this.filterIfApplied();
  }
  filterIfApplied(){
    var jobs = [];
    for (var i = 0; i < this.state.jobs_all.length; i++) {
      var flag = 0;
      for (var j = 0; j < this.state.applications.length; j++) {
        if (this.state.jobs_all[i].posting_id == this.state.applications[j].posting_id) {
          flag = 1;
        }
      }
      if (flag == 0) {
        jobs.push(this.state.jobs_all[i])
      }
    }
    this.setState({ jobs: jobs })
    
  }
  async apply(jobs) {
    var posting_id = jobs.posting_id;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: this.state.user_id, posting_id: posting_id })
    };
    await fetch('http://140.238.250.0:5000/add_application', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.data == "Application added.")
          alert("Application submitted")
      });
      window.location.reload();

  }
  saveJob(jobs) {
    console.log(jobs);
  }
  filterByTitle() {
    var input = document.getElementById("searchTitle");
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
    var td, txtValue, i, flag = 0;

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
  checkMatchingPostings(flag) {
    if (flag == 0) {
      var table = document.getElementById("postings");
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
                <Dropdown.Item onClick={(e) => this.filterByDepartment(e)} id="CS">CS</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByDepartment(e)} id="Mechanical">Mechanical</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="col-sm">
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                Location
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={(e) => this.filterByLocation(e)} id="Remote">Remote</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByLocation(e)} id="Hybrid">Hybrid</Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.filterByLocation(e)} id="Physical">Physical</Dropdown.Item>
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
                this.state.jobs.map(jobs => (
                  <tr>
                    <td id="postingId">{jobs.posting_id}</td>
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
                    <td>{jobs.display_name}</td>
                    <td id="postingDepartment">{jobs.department}</td>
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