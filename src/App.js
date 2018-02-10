import React, { Component } from 'react';
import Chunk from './lib/chunk';

import './App.css';

const snake = [{top: 0, left: 0}];

const drawableSkake = { color: 'green', pixels: snake };

const drawableObjects = [drawableSkake];

class App extends Component {
  componentDidMount() {
      Chunk.draw(drawableObjects);
  }
  render() {
    return (
      <div className="App">
        <canvas id="chunk-game" height="600" width="800"></canvas>
      </div>
    );
  }
}

export default App;
