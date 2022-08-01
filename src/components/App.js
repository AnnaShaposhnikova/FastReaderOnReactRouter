import React from "react";
// import "../index.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {EnterText} from "./EnterText";
import {ReadWord} from "./ReadWord";
import {useState} from "react";

// import EnterText from "./components/EnterText";
// import ReadWord from "./components/ReadWord";

export const App = () => {

    return (
        <Router>
            <Route exact path="/">
                <EnterText />
            </Route>
            <Route exact path="/read-word">
                <ReadWord />
            </Route>
            {/* <Route
                render={() => {
                    return (
                        <div className="not-found">
                            <h1>Page is not found</h1>
                        </div>
                    );
                }}
            ></Route> */}
        </Router>
    );

}




