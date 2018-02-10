import React, { Component } from 'react';
import Chunk from './lib/chunk';

import './App.css';

const snake = [{top: 0, left: 0}];

const drawSnake = (pixels) => {
    Chunk.draw([{ color: 'green', pixels }]);
}

class App extends Component {
  componentDidMount() {
      drawSnake(snake);
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
