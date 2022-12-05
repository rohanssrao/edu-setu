import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import NavBar from "./navbar";
import config from "../../config";
import { Form, Input, message } from "antd";

const { TextArea } = Input;

const MyVerticallyCenteredModal = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [appQuestions, setAppQuestions] = React.useState(null);
  const [appResponses, setAppResponses] = React.useState([]);

  const handleApplicationQuestion = (e, idx) => {
    let responses = [...appResponses];
    responses[idx] = e.target.value;
    setAppResponses(responses);
  }

  const handleApply = () => {
    //build appropriate object
    let answers = [];
    for (let i = 0; i < appQuestions.length; i++) {
      answers.push({
        question_id: appQuestions[i].question_id,
        answer: appResponses[i]
      });
    }
    props.apply(props.currentJob, answers, props.user_id);
  }

  React.useEffect(() => {
    let postingId = props.currentJob.posting_id;
    if (postingId) {
      let url = `${config.baseUrl}/get_questions_by_posting`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          posting_id: postingId
        })
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setAppQuestions(response.data);
            setAppResponses(Array(response.data.length).fill(''));
          } else {
            message.error(response.data, 1);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

  }, [props.currentJob.posting_id]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
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
        <p><b>Job type</b></p>
        <p>
          {props.currentJob.job_type}
        </p>
        <p><b>Description</b></p>
        <p>
          {props.currentJob.description}
        </p>
        <p><b>Pre-requisites</b></p>
        <p>
          {props.currentJob.prerequisites}
        </p>
        <p><b>Application Questions</b></p>

        {loading && <p>
          Loading...
        </p>}
        {!loading && appQuestions && appQuestions.map((question, idx) => {
          return (
            <div key={"app question" + idx} >
              <p>{question.question}</p>
              <TextArea
                //type="textarea"
                rows={4}
                label={question.question}
                name={question.question}
                onChange={(e) => { handleApplicationQuestion(e, idx) }}
                value={appResponses[idx]}
              />
            </div>);
        })}
        <p><b>Application Requirements</b></p>
        <p>
          {props.currentJob.requirements}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleApply}>Apply</Button>
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
      applications: [],
      department_list: [],
      location_list: []

    }
  }
  async componentWillMount() {
    var jobs = [];
    await this.setState({ user_id: sessionStorage.getItem("user_id") })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "user_id": this.state.user_id })
    };
    await fetch(`${config.baseUrl}/get_user_profile`, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.data }, () => { console.log(this.state.current_user); }));
    await fetch(`${config.baseUrl}/get_all_postings`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let department_set = new Set(data.data.map((job) => (job.department)));
        let location_set = new Set(data.data.map((job) => (job.location)));
        this.setState({
          jobs_all: data.data, department_list: Array.from(department_set),
          location_list: Array.from(location_set)
        });
      });
    const requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "student": this.state.user_id })
    };

    await fetch(`${config.baseUrl}/get_all_applications_by_student`, requestOptions2)
      .then(response => response.json())
      .then(data => this.setState({ applications: data.data }, () => {
        this.filterIfApplied();

      }));
  }
  filterIfApplied() {
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
    this.setState({ jobs: jobs }, () => {
      if (this.state.jobs.length == 0) {
        var message = "Sorry! There are no postings available right now."
        this.removeTable(message);
      }
    })

  }
  async apply(jobs, answers, user_id) {
    var posting_id = jobs.posting_id;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user_id, posting_id: posting_id, responses: answers })
    };
    await fetch(`${config.baseUrl}/add_application`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status == true)
          alert("Application submitted")
      });
    window.location.reload();

  }
  saveJob(jobs) {
    console.log(jobs);
  }
  removeTable(message) {

    var table = document.getElementById("postings");
    table.style.display = "none";
    const para = document.createElement("p");
    const node = document.createTextNode(message);
    para.appendChild(node);
    const element = document.getElementById("mainBody");
    element.appendChild(para);

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
  filterByDepartment(e, all) {

    var filter = e.target.id.toUpperCase();
    var table = document.getElementById("postings");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue, i, flag = 0;
    if (all === true) {
      // Optional parameter, filter by all
      // Loop through all table rows, showing all of them
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          tr[i].style.display = "";
          flag = 1;
        }
      }
      this.checkMatchingPostings(flag);
      return;
    }

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
    var message = "Sorry, couldn't find any matching jobs."
    if (flag == 0) {
      this.removeTable(message);
    }

  }
  filterByLocation(e, all) {

    var filter = e.target.id.toUpperCase();
    var table = document.getElementById("postings");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue, i, flag = 0;

    if (all === true) {
      // Optional parameter, filter by all
      // Loop through all table rows, showing all of them
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
          tr[i].style.display = "";
          flag = 1;
        }
      }
      this.checkMatchingPostings(flag);
      return;
    }
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
        <NavBar name={"Search for a research role"} />
        <div className="container">
          <p></p>
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
                <Dropdown.Item onClick={(e) => this.filterByDepartment(e, true)}
                  key={"all"} id={"all"}>All</Dropdown.Item>
                {
                  this.state.department_list.map((department) => {
                    if (department == null) {
                      return;
                    }
                    return (
                      <Dropdown.Item onClick={(e) => this.filterByDepartment(e)}
                        key={department} id={department}>{department}</Dropdown.Item>);
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="col-sm">
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                Location
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={(e) => this.filterByLocation(e, true)}
                  key={"all"} id={"all"}>All</Dropdown.Item>
                {
                  this.state.location_list.map((location) => {
                    if (location == null) {
                      return;
                    }
                    return (
                      <Dropdown.Item onClick={(e) => this.filterByLocation(e)}
                        key={location} id={location}>{location}</Dropdown.Item>);
                  })
                }

              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <link rel="stylesheet" href="studentDashboard.css"></link>

        <div id="mainBody">
          <div className="container" id="postings">
            {
              (this.state.jobs.length > 0) &&
              <Table striped hover className="col-6" responsive id="postings">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th >Title</th>
                    <th>Type</th>
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
                          this.setState({ currentJob: jobs });
                          //setCurrentJob(job => ({ ...job, role: jobs.role, description: jobs.description, prerequisites: jobs.prerequisites }));
                        }}>
                          {jobs.title}
                        </a>

                          <MyVerticallyCenteredModal
                            show={this.state.modalShow} currentJob={this.state.currentJob}
                            apply={this.apply}
                            user_id={this.state.user_id}
                            onHide={() => this.setState({ modalShow: false })}

                          /></td>
                        <td id="job_type">{jobs.job_type}</td>
                        <td>{jobs.display_name}</td>
                        <td id="postingDepartment">{jobs.department}</td>
                        <td id="postingLocation">{jobs.location}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                              Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                              <Dropdown.Item active onClick={() => {
                                this.setState({ modalShow: true });
                                this.setState({ currentJob: jobs });
                              }}>Apply</Dropdown.Item>
                              <Dropdown.Item >Save for Later</Dropdown.Item>
                              <Dropdown.Item >Get shareable URL</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>

                    ))
                  }
                </tbody>
              </Table>
            }
          </div>
        </div>
      </>
    )
  }

}

export default StudentDashboard