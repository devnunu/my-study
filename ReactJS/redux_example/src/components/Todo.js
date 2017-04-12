import React from 'react';
import ReactDOM from 'react-dom'

/* Reducer */
const todoReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADDTODO':
      return [...state, action.todo];
    dafault:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(todoReducer);

/* UI Component */
export default class Todo extends React.Component {

  addTodo(evt) {
      store.dispatch({
        type: 'ADDTODO',
        todo : evt.target.previousSibling.value
      });
  }

  render() {
    let data = this.props.data;
    let listHTML = "";

    if(typeof data !== "undefined") {
      listHTML = data.map((v,i) => {
        return <li key={i}>{v}</li>
      });
    }

    return (
      <div>
        <div>
         <input type="text" placeholder="할일입력" />
         <button onClick={this.addTodo}> 추가 </button>
        </div>
        <div>
          {listHTML}
        </div>
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(
    <Todo data={store.getState()} />, document.querySelector("#root")
  );
};

//store가 변경되면 view component를 다시 렌더링하도록 등록.
store.subscribe(render);

//rendering 처음 실시
render();
