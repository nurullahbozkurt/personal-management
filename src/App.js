import React from "react";
import Form from "./components/Form";
import Update from "./components/Update";
import PersonalList from "./components/PersonalList";
import Search from "./components/Search";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="card row" style={{ backgroundColor: "##fcfcfc" }}>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#425d7c",
            color: "white",
          }}
          className="card-header"
        >
          <Link
            style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
            to="/"
          >
            Personal Project
          </Link>
          <img
            style={{ height: "40px", width: "40px", textAlign: "center" }}
            src="img/logo.svg"
            alt=""
          />
        </div>
        <div className="card-body">
          <Switch>
            <Route path="/personals/:id/edit" component={Update}></Route>
            <Route component={Form}></Route>
          </Switch>

          <hr />

          <hr />
        </div>

        <Search />

        <PersonalList />
      </div>
    </div>
  );
}

export default App;
