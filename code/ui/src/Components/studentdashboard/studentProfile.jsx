import React from "react";
import { Component } from 'react'
import NavBar from "./navbar";
import './studentProfile.css'
import { Select, message } from 'antd';
import config from "../../config";


export class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 1007,
            user_name: "",
            current_user: {},
            disabled: true
        };
    }
    async componentWillMount() {
        await this.setState({ user_id: sessionStorage.getItem("user_id") })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "user_id": this.state.user_id })
        };
        await fetch(`${config.baseUrl}/get_user_profile`, requestOptions)
            .then(response => response.json())
            .then(data => {
                var changed_details = data.data;
                changed_details["user_id"] = this.state.user_id;
                this.setState({ current_user: changed_details, user_name: data.data.display_name })
            });


    }
    updateValues(e) {
        var changed_details = this.state.current_user;
        var detail = document.getElementById(e.target.id).value;
        changed_details[e.target.id] = detail
        this.setState({ current_user: changed_details });
    }
    updateSkills(s) {
        var changed_details = this.state.current_user;
        changed_details["skills"] = s
        this.setState({ current_user: changed_details });
    }
    onTypeChange = (type) => {
        console.log(type);
        this.setState({ registrationType: type });
    };
    async updateProfile() {
        this.setState({ disabled: true });
        var current_user = this.state.current_user;
        current_user['password'] = "jane.doe@gmail.com";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(current_user)
        };
        await fetch(`${config.baseUrl}/edit_profile`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status == true) {
                    message.success("Profile updated successfully!");
                }
            });
        //window.location.reload();

    }
    async updateEdit() {
        this.setState({ disabled: false });
    }
    render() {
        return (
            <>
                <NavBar name={"Profile Settings"} />
                <div class="container rounded bg-white mt-5 mb-5">
                    <div class="row">
                        <div class="col-md-3 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png" />
                                <span class="font-weight-bold">{this.state.user_name}</span><span class="text-black-50">{this.state.current_user.email}</span><span> </span></div>
                        </div>
                        <div class="col-md-9 border-right">
                            <div class="p-3 py-5">
                                <div class="row mt-2">
                                    <div class="col-md-6"><label class="labels">Name</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.display_name} id="display_name" onChange={(e) => this.updateValues(e)} /></div>
                                    <div class="col-md-6"><label class="labels">Mobile Number</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.phone} id="phone" onChange={(e) => this.updateValues(e)} /></div>

                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"><label class="labels">Degree</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.degree} id="degree" onChange={(e) => this.updateValues(e)} /></div>
                                    <div class="col-md-6"><label class="labels">Major</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.major} id="major" onChange={(e) => this.updateValues(e)} /></div>
                                    <div class="col-md-6"><label class="labels">Minor</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.minor} id="minor" onChange={(e) => this.updateValues(e)} /></div>
                                    <div class="col-md-3"><label class="labels">GPA</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.gpa} id="gpa" onChange={(e) => this.updateValues(e)} /></div>
                                    <div class="col-md-3"><label class="labels">Year</label><input disabled={this.state.disabled} type="text" class="form-control" placeholder={this.state.current_user.year} id="year" onChange={(e) => this.updateValues(e)} /></div>
                                </div>
                                <div class="row mt-3">
                                    <label class="labels">Skills</label>
                                    <Select
                                        id="skills"
                                        mode="tags"
                                        disabled={this.state.disabled}
                                        style={{ width: '50%' }}
                                        value={this.state.current_user.skills}
                                        onChange={(s) => this.updateSkills(s)}
                                        open={false}
                                    >
                                    </Select>
                                </div>
                                <div class="mt-5 text-center">
                                    {!this.state.disabled && <button class="btn btn-primary profile-button p-2" type="button" onClick={(e) => this.updateProfile(e)}>Save Profile</button>}

                                    {this.state.disabled && <button class="btn btn-primary profile-button p-2" type="button" onClick={(e) => this.updateEdit(e)}>Edit Profile</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}