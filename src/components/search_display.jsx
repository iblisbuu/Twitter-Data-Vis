import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client"; 
import SentimentCount from "./sentiment_count";
import WorldMap from "./world_map";
import PieChart from './pie_chart/pie_chart';

export default class SearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    // Set instance variable for displaying search term
    this.currentSearchTerm = 'Enter a subject';

    // Bind functions for context
    this.handleChange = this.handleChange.bind(this);

    // Create socket client to receive emitted data from server
    this.socket = socketIOClient(window.location.host);
  }

  componentDidMount() {
    axios.post('/destroy');
  }

  // Update search term from input field
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  // Update local state and API stream when search term is submitted
  handeSubmit() {
    return e => {
      e.preventDefault();
      this.currentSearchTerm = this.state.searchTerm || 'Enter a subject';
      axios.post('/setSearchTerm', {
        term: this.state.searchTerm
      }).then(res => console.log(res)).catch(err => console.log(err));
      this.setState({ searchTerm: '' });
    };
  }

  render() {
    return (
      <>
        <div className="search">
          <h2>{this.currentSearchTerm}</h2>
          <form onSubmit={this.handeSubmit()}>
            <input
              className='search'
              type='text'
              onChange={this.handleChange}
              value={this.state.searchTerm}
              placeholder='Search...' 
            />
          </form>
        </div>
        <div className="top-row-modules">
          <SentimentCount socket={this.socket} searchTerm={this.currentSearchTerm} />
          <PieChart socket={this.socket} searchTerm={this.currentSearchTerm} />
        </div>
        <WorldMap socket={this.socket} searchTerm={this.currentSearchTerm} />
      </>
    )
  }
}