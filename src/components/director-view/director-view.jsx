import React from "react";
import PropTypes from "prop-types";

import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export function DirectorView(props) {
  const { director, onBackClick } = props;
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="director-name">
                <span className="label">Name: </span>
                <span className="value">{director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div>
              <Link to={`/`}>
                <Button
                  style={{ marginTop: "1rem" }}
                  variant="primary"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Go back to movie list
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}