import React, { Component } from "react";
import "../index.css";

export default class GameController extends Component {
  render() {
    return (
      <div className="game_controller">
        <button onClick={this.props.onAdd}> Add card </button>
        <button onClick={this.props.onDelete}> Remove card </button>
        <button onClick={this.props.onClear}>Clear cards</button>
        <button onClick={this.props.onKitten}>Give me kittens!</button>
      </div>
    );
  }
}
