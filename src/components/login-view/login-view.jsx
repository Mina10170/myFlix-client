import React, { useState } from 'react';
import PropTypes from 'prop-types';

// SCSS Import
import "./login-view.scss";

// React Bootstrap 
import { Navbar, Container, Nav, Form, Button, Card, Container } from 'react-bootstrap';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div className="login-view">
      <Navbar expand="lg" bg="#5B84B1FF" variant="dark" className="loginNavbar">
      <Container>
      <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#update-profile">Update Profile</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
      </Container>
      </Navbar>

      <Container fluid className="loginContainer" >   
        <Card bg="#fc766aff" className="loginCard">
          <Card.Body>
            <Card.Title className="text-center">Welcome to the login page!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
            <Form >
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter a username"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  className="mb-3" 
                  type="password" 
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter a password"
                />
              </Form.Group>
              <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};