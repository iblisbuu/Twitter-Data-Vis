import React, { Component } from 'react';
import './App.css';
import Tweets from './components/tweets';
import WorldMap from './components/world_map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap />
      </div>
    );
  }
}

export default App;
