import React from "react";
import "../index.css";
import { Col } from "react-bootstrap";

export default function Card(props) {
  const text = props.props.style === "active_card" ? props.props.number : "";

  return (
    <Col className={props.props.style} onClick={props.onClick}>
      <h1>{text}</h1>
    </Col>
  );
}
