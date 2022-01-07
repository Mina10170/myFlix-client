//import needed files.
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { Row, Col, Container } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { setMovie } from "../../actions/actions";

import MovieList from "../movies-list/movies-list";
import "./main-view.scss";

// create a class component with the name 'MainView', that can be exported and imported in other files.
class MainView extends React.Component {
  constructor() {
    // Is the entry point for the component.
    super(); // The super function is needed to be able to use this.state. It initializes the components state.
    this.state = {
      // code executed right when the component is created in the memory.
      // initial state set to null, and empty array.
      user: null,
    };
  }

  componentDidMount() {
    //Every time a user loads the page and the componentDidMount method is called, you check if the user is logged in (by retrieving this information from localStorage). Only if the user is already logged in do you make the same GET request to the “movies” endpoint (by calling the getMovies method).
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  //======================Before Redux=======================
  // getMovies(token) {
  //   axios
  //     .get("https://topimdbmovies.herokuapp.com/movies", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  getMovies(token) {
    axios
      .get("https://movieapi-morkos.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovie(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*.
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <>
        <Router>
          <NavbarView user={user} />
          <Container>
            <Row className="main-view justify-content-md-center">
              {/* route for link on main-view to movie-card, otherwise the login-view. */}
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return <MovieList movies={movies} />;
                }}
              />
              {/* route for link on main-view to register-view */}
              <Route
                exact
                path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />
              {/* route for link on main-view to movie-view */}
              <Route
                path="/movies/:movieId"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              {/* route for link on main-view to genre-view */}
              <Route
                path="/genres/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              {/* route for link on main-view to director-view */}
              <Route
                path="/directors/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              {/* route for link on main-view to profile-view */}
              <Route
                path="/profile"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );

                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <ProfileView
                      history={history}
                      movies={movies}
                      user={user === match.params.username}
                      onBackClick={() => history.goBack()}
                    />
                  );
                }}
              />
            </Row>
          </Container>
        </Router>
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovie })(MainView);