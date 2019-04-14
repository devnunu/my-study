const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reduces[key](state[key], action);
      return nextState;
    }, {});
  };
};
