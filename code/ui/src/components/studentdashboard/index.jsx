import React, { useState } from "react";
import styled from "styled-components";
import StudentDashboard from "./studentdashboard";
import TrackApplication from "./trackapplication";
import { Route } from "react-router";
import { Component } from 'react'

export class StudentHomePage extends Component {
    componentDidMount(){
        console.log("mounted studenthome")
    }
    render(){
        return (
            <>
                <StudentDashboard />

            </>
    
        )
    }
    
}
