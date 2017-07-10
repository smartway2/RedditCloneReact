import React, { Component } from 'react';
import Nav from './Nav';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Nav />
        <PostList />
      </div>
    );
  }
}

export default App;
