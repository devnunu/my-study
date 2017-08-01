import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

export interface AppProps {
  name : string;
}

interface AppState {
  age:number
  todo: string[];
}

class App extends React.Component < AppProps , AppState > {
  static defaultProps ={
    company : 'studio'
  };

  constructor(props:AppProps) {
    super();
    this.state = {
      age : 35,
      todo: ['first']
    };
    this._rollback = this._rollback.bind(this);
  }

  componentWillMount() {
    console.log('App componentWillMount');
  }

  componentDidMount() {
    console.log('App componentDidMount');
    setInterval(() => {
      this.setState({
        age : this.state.age + 1
      });
    }, 2000);
    
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.name}, {this.state.todo.join(', ')}</h2>
        </div>
        <p className="App-intro">
          <StatelessComponent name={this.props.name} />
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={this._rollback}>회춘</button>
      </div>
    );
  }

  private _rollback() : void{
    const todo :string[] = this.state.todo;
    todo.push('second');

    this.setState({
      todo:todo
    });
  }
}


const StatelessComponent:React.SFC<AppProps> = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}



export default App;
