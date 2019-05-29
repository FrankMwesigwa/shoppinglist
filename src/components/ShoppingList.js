import React, { Component } from "react";
import Proptypes from "prop-types";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import { getItems } from "../store/items/actions";

class ShoppingList extends Component {
  static propTypes = {
    getItems: Proptypes.func.isRequired,
    items: Proptypes.object.isRequired
  };

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    console.log("xxxxx", items);
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Enter Name");
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }));
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems }
)(ShoppingList);
