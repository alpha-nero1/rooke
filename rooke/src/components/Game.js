import React, { Component } from "react";
import GameController from "./GameController";
import Card from "./Card";
import { Row } from "react-bootstrap";

const KITTEN_CARD = "kitten_card";
const ACTIVE_CARD = "active_card";
const DEACTIVE_CARD = "deactive_card";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: Array(6).fill(null),
      active_card: 0,
      is_kitten: false
    };

    this.state.cards = this.configure_cards();
    this.baseState = this.state; // store so we can revert.
  }

  // Handle when we click on a card.
  handle_click(index) {
    console.log("PRESSED: " + index);
    const cards = this.configure_cards(index);
    if (index === this.state.active_card) {
      index = 0;
    }
    this.setState({
      ...this.state,
      cards: cards,
      active_card: index
    });
  }

  // Configure card objects based on what is active.
  configure_cards(active = 0) {
    var all_cards = [];
    const deactive = this.state.is_kitten ? KITTEN_CARD : DEACTIVE_CARD;
    const length = this.state.cards.length + 1;

    for (var i = 1; i < length; i++) {
      const this_card = {
        number: i,
        style: active === i ? ACTIVE_CARD : deactive
      };

      if (this.state.active_card === i) {
        this_card.style = deactive;
      }

      all_cards.push(this_card);
    }
    return all_cards;
  }

  // Set to original state.
  clear_cards() {
    this.setState(this.baseState);
  }

  // Add a card to the set.
  add_card() {
    const { cards } = this.state;
    const newleng = cards.length + 1;
    const deactive = this.state.is_kitten ? KITTEN_CARD : DEACTIVE_CARD;

    cards.push({
      number: newleng,
      style: deactive
    });

    this.setState({
      ...this.state,
      cards: cards
    });
  }

  // Remove a card from the set.
  remove_card() {
    const { cards } = this.state;
    cards.pop();

    this.setState({
      ...this.state,
      cards: cards
    });
  }

  // Populate the cards with kitten images.
  give_kitten() {
    const kitten_url = "http://placekitten.com/200/";
    const { active_card } = this.state;
    const kitten_cards = [];
    const length = this.state.cards.length + 1;

    for (var i = 1; i < length; i++) {
      const this_card = {
        number: i,
        style: active_card === i ? ACTIVE_CARD : KITTEN_CARD,
        url: kitten_url + i + "00/"
      };
      kitten_cards.push(this_card);
    }

    this.setState({
      ...this.state,
      active_card: 0,
      cards: kitten_cards,
      is_kitten: !this.state.is_kitten
    });
  }

  // Render an individual card according to params.
  render_card(card, key) {
    return (
      <Card
        key={key}
        props={card}
        onClick={() => {
          this.handle_click(card.number);
        }}
      />
    );
  }

  // Render the rows 'view'.
  render_rows() {
    const rows = [...Array(Math.ceil(this.state.cards.length / 3))];
    const card_rows = rows.map((row, idx) =>
      this.state.cards.slice(idx * 3, idx * 3 + 3)
    );

    console.log(card_rows);
    const content = card_rows.map((row, idx) => (
      <Row key={idx}>{row.map(card => this.render_card(card))}</Row>
    ));

    return content;
  }

  render() {
    return (
      <div>
        <div className="game">{this.render_rows()}</div>
        <GameController
          onAdd={() => this.add_card()}
          onDelete={() => this.remove_card()}
          onClear={() => this.clear_cards()}
          onKitten={() => this.give_kitten()}
        />
      </div>
    );
  }
}
