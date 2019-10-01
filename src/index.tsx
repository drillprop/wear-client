import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

const Index = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
