import React, { Component } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";

class App extends Component {
  render() {
    return (
      <div>
        <AppNavBar />
        <ShoppingList />
      </div>
    );
  }
}

export default App;
