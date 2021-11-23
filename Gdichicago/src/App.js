import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Basics from './Component/Basics';
import TypeOfClimp from './Component/TypeOfClimp';
import Safety from './Component/Safety';
import Equipment from './Component/Equipment';
import WhereToClimp from './Component/WhereToClimp';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Nav from './Component/Nav';

function App() {
  return (
    <div id="wrapper">
      <Header />
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route path="/" component={Basics} exact />
            <Route path="/TypeOfClimp" component={TypeOfClimp} />
            <Route path="/Safety" component={Safety} />
            <Route path="/Equipment" component={Equipment} />
            <Route path="/WhereToClimp" component={WhereToClimp} />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
