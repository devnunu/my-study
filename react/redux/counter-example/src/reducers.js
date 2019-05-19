import { INCREMENT, DECREMENT } from "./actions";

const initialState = {
  num: 0
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, num: state.num + 1 };
    case DECREMENT:
      return { ...state, num: state.num - 1 };
    default:
      return state;
  }
};

export default counter;
