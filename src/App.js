import React, { Component } from 'react';
import { Redirect, Switch, Route } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import AboutContainer from "./containers/AboutContainer";
import RatesContainer from "./containers/RatesContainer";
import MainMenu from "./components/MainMenu";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainMenu />
        <Switch>
          <Route exact path="/" component={HomeContainer}/>
          <Route path="/about" component={AboutContainer}/>
          <Route path="/rates" component={RatesContainer}/>
          <Redirect to={`/`} />
        </Switch>
      </div>
    );
  }
}

export default App;
