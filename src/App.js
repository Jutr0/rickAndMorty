import { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { APIContext } from "./utils/APIContext";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "./scss/index.css";

const axios = require("axios");
const apiCaller = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

function App() {
  const [apiResponse, setApiResponse] = useState({});

  return (
    <APIContext.Provider value={[apiResponse, setApiResponse, apiCaller]}>
      <Router>
        <Switch>
          <Route path="/details/:type/:detailsID">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </APIContext.Provider>
  );
}

export default App;
