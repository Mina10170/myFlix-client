import React from "react";
import { Button, Card, Row, Col, Form, Container } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://movieapi-morkos.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDeregister() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://movieapi-morkos.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://movieapi-morkos.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert(`${username}, Your profile has been updated.`);
        window.open(`/profile`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRemoveFavorite(e, movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://movieapi-morkos.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { movies, onBackClick, user } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <div className="profile-container">
                  <span className="label">Username: </span>
                  <span className="value">{Username}</span>
                  <br />
                  <br />
                  <span className="label">Email: </span>
                  <span className="value">{Email}</span>
                  <br />
                  <br />
                  <span className="label">Birthday: </span>
                  <span className="value">{Birthday}</span>
                </div>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body className="card-body">
                <Card.Title className="card-title">Update Profile</Card.Title>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <span className="subtitle">USERNAME:</span>
                    <br />
                    <input
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <span className="subtitle">PASSWORD:</span>
                    <br />
                    <input
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <span className="subtitle">EMAIL:</span>
                    <br />
                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <span className="subtitle">BIRTHDAY:</span>
                    <br />
                    <input
                      type="date"
                      name="Birthday"
                      placeholder="mm/dd/yyyy"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <div className="bt">
                    <Button
                      className="button"
                      variant="warning"
                      type="submit"
                      onClick={() => this.editUser()}
                    >
                      Update User
                    </Button>
                    <Button
                      className="button"
                      className="delete-button"
                      variant="danger"
                      onClick={() => this.onDeregister()}
                    >
                      {" "}
                      Delete User{" "}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Card>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <h4>{Username} Favorite Movies</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Body>
                {FavoriteMovies.length === 0 && (
                  <div className="text-center">No Favorite Movie</div>
                )}
                <Row className="favorite-container">
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id ===
                        FavoriteMovies.find((fav) => fav === movie._id)
                      ) {
                        return (
                          <Card
                            className="favorite-movie card-content"
                            key={movie._id}
                          >
                            <Card.Img
                              className="fav-poster"
                              variant="top"
                              crossOrigin="true"
                              src={movie.ImagePath}
                            />
                            <Card.Body>
                              <Card.Title className="movie_title">
                                {movie.Title}
                              </Card.Title>
                              <Button
                                size="sm"
                                variant="danger"
                                value={movie._id}
                                onClick={(e) => this.onRemoveFavorite(e, movie)}
                              >
                                {" "}
                                Remove{" "}
                              </Button>
                            </Card.Body>
                          </Card>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <br />
        <div className="backButton">
          <Button
            size="md"
            variant="primary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
        <br />
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);