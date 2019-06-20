import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";

import CounterView from "./counter/CounterView";
import "./styles.css";

const store = createStore(reducers);
function App() {
  return (
    <div className="App">
      <CounterView store={store} />
    </div>
  );
}

const rootElement = document.getElementById("root");
const render = () => ReactDOM.render(<App />, rootElement);

store.subscribe(render);
render();
