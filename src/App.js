import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import NavbarComponent from "./components/NavbarComponent";

//pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log("state is login", isLogin);

  return (
    <div className="App">
      <NavbarComponent />
      <Switch>
        <Route exact path="/">
           <Home />
        </Route>
        <Route path="/dashboard">
          {isLogin ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login setIsLogin={setIsLogin} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
