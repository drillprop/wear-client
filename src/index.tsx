import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Globalstyle from './utils/globalstyle';
import Layout from './components/Layout/Layout';

const Index = () => {
  return (
    <>
      <Globalstyle />
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Layout>
      </Router>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
