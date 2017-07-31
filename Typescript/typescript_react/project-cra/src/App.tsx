import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

interface AppProps {
  name:string
}

interface AppState {
  age:number
}

class App extends React.Component < AppProps , AppState > {
  private _interval: number;

  constructor(props:AppProps) {
    super();
    this.state = {
      age : 35
    };
    setInterval(() => {
      this.setState({
        age : this.state.age + 1
      });
    }, 2000);
  }

  componentWillMount() {
    console.log('App componentWillMount');
  }

  componentDidMount() {
    console.log('App componentDidMount');
    this._interval = window.setInterval(
      () => {
        this.setState({
          age: this.state.age + 1
        });
      },
      1000
    );
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
    clearInterval(this._interval);
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.name}, {this.state.age}</h2>
        </div>
        <p className="App-intro">
          <StatelessComponent name = {this.props.name} />
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}


const StatelessComponent:React.SFC<AppProps> = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

export default App;
