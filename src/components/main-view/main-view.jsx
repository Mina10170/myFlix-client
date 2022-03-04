import React from 'react';
import axios from 'axios';

// SCSS Import
import "./main-view.scss";

// React Components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";

// React Bootstrap 
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    axios.get('https://movieapi-morkos.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie`
   *property to that movie*/

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details 
    are *passed as a prop to the LoginView*/
    if(!user) return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar expand="lg" bg="#162b48" variant="dark" className="mainNavbar">
        <Container>
        <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#update-profile">Update Profile</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
        </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map((movie) => (
            <Col md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))        
        }
        </Row>
      </div>
    );    
  }
}