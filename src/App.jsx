import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./comps/Chat";
import Login from "./comps/Login";
import Profile from "./comps/Profile";

const App = () => {
  return (
    <Router>
      <div className='App'>
        
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/chat'>
              <Chat />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
