import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Navbar expand="lg" className='shadow-sm'>
                <Container>
                    <Navbar.Brand href="#home" className='text-theme h1'>JsonForms</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            <Link className='nav-link' to="/user/listing">User</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default Layout
