import React, { Component } from "react";
import Camera from "./pages/camera";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="App-body">
          <Camera />
        </section>
      </div>
    );
  }
}

export default App;
