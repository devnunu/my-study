import React from "react";
import { increment, decrement } from "../actions";

const Counter = props => {
  return (
    <div>
      <button onClick={() => props.store.dispatch(increment())}>+</button>
      <div>{props.store.getState().num}</div>
      <button onClick={() => props.store.dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;
