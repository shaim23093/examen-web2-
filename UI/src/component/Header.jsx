import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand>
                    <h4 className="text-light">Gestion de Patrimoine</h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="text-light">Possessions</Nav.Link>
                        <Nav.Link as={Link} to="/patrimoine" className="text-light">Patrimoine</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;