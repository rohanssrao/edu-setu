import React from 'react'
import { AppWrapper } from "./resume_generator/src/App_wrapper"
import NavBar from "./Components/studentdashboard/navbar"
import { Space } from 'antd';
// just need to wrap the resume geneartor with the nav bar
export class RGWrapper extends React.Component {
    render() {
        // const Navbar = NavBar()
        return (
            
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <NavBar />
        <AppWrapper />
      </Space>
        )
    }
}
