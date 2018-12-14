import React, { Component } from 'react';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isLoading: false
    };
    this.searchYelp = this.searchYelp.bind(this);
  }
  componentWillUnmount() {
    this.setState({isLoading: true});
  }

  searchYelp(term, location, sortBy) {
    this.setState({isLoading:  true});
     Yelp.search(term, location, sortBy).then( businesses => {
       this.setState({
         businesses: businesses,
         isLoading: false
       })
     });
  }
  render() {
    if(this.state.isLoading) {
      return (
          <div className="App">
            <h1>ravenous</h1>
            <SearchBar searchYelp={this.searchYelp}/>
            <h3 className="loading-text">Loading...</h3>
          </div>
      );
    }
    return (
        <div className="App">
          <h1>ravenous</h1>
          <SearchBar searchYelp={this.searchYelp}/>
          <BusinessList businesses={this.state.businesses}/>
        </div>
    );
  }
}

export default App;
