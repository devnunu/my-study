# redux

redux ducks 방식으로 리덕스를 만들어보자. 타이머 제작 예제의 일부분이다.

## 구성요소

- Import
- Auction
- Action Createors
- Reducer
- Reducer Functions
- Export Action Creators
- Export Reducer

## 코드

```javascript
// reducer.js

// Import

// Auctions

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECOND = 'ADD_SECOND';

// Action Creators

function startTimer() {
  return {
    type: START_TIMER,
  };
}

function restartTimer() {
  return {
    type: RESTART_TIMER,
  };
}

function addSecond() {
  return {
    type: ADD_SECOND,
  };
}

// Reducer

const TIME_DURATION = 1500;

const initialState = {
  isPlaying: false,
  elapsedTime: 0,
  timerDuration: TIME_DURATION,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return applyStartTimer(state);
    case RESTART_TIMER:
      return restartTimer(state);
    case ADD_SECOND:
      return applyAddSecond(state);
    default:
      return state;
  }
}

// Reducer Function

function applyStartTimer(state) {
  return {
    ...state,
    isPlaying: true,
    elapsedTime: 0,
  };
}

function applyRestartTimer(state) {
  return {
    ...state,
    isPlaying: false,
    elapsedTime: 0,
  };
}

function applyAddSecond(state) {
  if (state.elapsedTime < TIMER_DURATION) {
    return {
      ...state,
      elapsedTime: state.elapsedTime + 1,
    };
  } else {
    return {
      ...state,
      isPlaying: false,
    };
  }
}

// Export Action Crateor

const actionCreators = {
  startTimer,
  restartTimer,
  addSecond,
};

export { actionCreators };

// Export Reducer

export default reducer;
```

## 리듀서 연결

```javascript
import React from 'react';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Timer />
      </Provider>
    );
  }
}
```

## 파일 분리

connect 는 컴포넌트를 스토어에 연결하는것을 도와준다.

```javascript
// index.js

import { connect } from 'react-redux';
import { bindActionCreators } from 'react';
import { actionCreators as tomatoActions } from '../../reducer';

import Timer from './presenter';

function mapStateToProps(state) {
  const { isPlaying, elapsedTime, timerDuration } = statel;
  return {
    isPlaying,
    elapsedTime,
    timerDuration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: bindActionCreators(tomatoActions.startTimer, dispatch),
    restartTimer: bindActionCreators(tomatoActions.restartTimer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
```
