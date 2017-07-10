import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Edit from './components/Edit';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div className="container-fluid">
      <Route exact path="/" component={App} />
      <Route path="/edit/:id" component={Edit}/>
    </div>
  </Router>,
  document.getElementById('root')
);
