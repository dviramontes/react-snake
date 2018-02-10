import React, { Component } from 'react';
import Chunk from './lib/chunk';

import './App.css';

const drawSnake = (snake) => {
    Chunk.draw([{ color: 'green', pixels: snake }]);
}

const moveSnake = (snake) => {
    const oldSegment = snake[0];
    const newSegment = {
        top: oldSegment.top + 1,
        left: oldSegment.left + 1,
    };
    return [newSegment];
}

class App extends Component {
  componentDidMount() {
      let snake = [{ top: 0, left: 0 }];
      snake = moveSnake(snake);
      snake = moveSnake(snake);
      snake = moveSnake(snake);
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
