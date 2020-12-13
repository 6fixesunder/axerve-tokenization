import React from 'react';
import './App.scss';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuBar from './components/MenuBar/MenuBar';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Payment from './components/Payment/Payment';
import UseAppContext from './hooks/UseAppContext';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <div className="App">
      <UseAppContext>
        <Router>
          <Loader />
          <div className="MenuBarContainer">
            <MenuBar />
          </div>
          <div className="Container">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route path="/payment" component={Payment}></Route>
            </Switch>
          </div>
          <div className="FooterContainer">
            <Footer />
          </div>
        </Router>
      </UseAppContext>
    </div>
  );
}

export default App;
