import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
  }

  addFavoriteMovie() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://movieapi-morkos.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        alert(`Added to Favorites List`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-view">
                  <div className="movie-poster">
                    <img
                      variant="top"
                      src={movie.ImagePath}
                      crossOrigin="true"
                      style={{
                        width: "40%",
                      }}
                    />
                  </div>
                  <div className="description-container">
                    <div className="movie-title">
                      <span className="label">Title: </span>
                      <span className="value">{movie.Title}</span>

                      <span>
                        <Link to={`/directors/${movie.Director.Name}`}>
                          <Button variant="link">Director</Button>
                        </Link>
                      </span>
                      <span>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                          <Button variant="link">Genre</Button>
                        </Link>
                      </span>
                    </div>
                    <div className="movie-description">
                      <span className="label">Description: </span>
                      <span className="value">{movie.Description}</span>
                    </div>
                    <Row>
                      <Button
                        variant="outline-primary"
                        className="btn-outline-primary fave-button"
                        value={movie._id}
                        onClick={(e) => this.addFavoriteMovie(e, movie)}
                      >
                        Add to Favorites
                      </Button>
                    </Row>

                    <Button
                      style={{ marginTop: "1rem" }}
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        onBackClick(null);
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}