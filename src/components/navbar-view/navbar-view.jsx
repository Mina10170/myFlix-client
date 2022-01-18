import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import './navbar-view.scss';


export class NavbarView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/profile`;

    if (!user) return null;

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={movies}>My Flix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={movies}>Movies</Nav.Link>
            <Nav.Link href={profile}>Profile</Nav.Link>
            <Nav.Link href={"/"} onClick={this.onLoggedOut}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}