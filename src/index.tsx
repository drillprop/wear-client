import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Globalstyle from './utils/globalstyle';
import Layout from './components/Layout/Layout';
import Sign from './pages/Sign/Sign';
import Man from './pages/Man/Man';
import Woman from './pages/Woman/Woman';
import Checkout from './pages/Checkout/Checkout';

const Index = () => {
  return (
    <>
      <Globalstyle />
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/sign' component={Sign} />
            <Route path='/man' component={Man} />
            <Route path='/woman' component={Woman} />
            <Route path='/checkout' component={Checkout} />
          </Switch>
        </Layout>
      </Router>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
